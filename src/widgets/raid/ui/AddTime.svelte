<script lang="ts">
	import {
		GAME_CHANNELS,
		postRaidTime,
		type GameChannel,
		type RaidData
	} from '$entities/raid'
	import Button from '$shared/button/ui/Button.svelte'
	import { cn } from '$shared/lib'
	import { Tab, Tabs } from '$shared/tabs'
	import { toast } from '$shared/toast'

	export let raid: RaidData
	let isShowForm = false

	type Form = {
		channel: GameChannel | null
		timeRemaining: number | null
	}

	let form: Form = {
		channel: null,
		timeRemaining: null
	}
	let inputElement: HTMLInputElement

	const onToggleShowForm = () => {
		isShowForm = !isShowForm
		setTimeout(() => {
			inputElement && inputElement.focus()
		}, 60)
	}

	const selectChannel = (channel: GameChannel) => {
		form = { ...form, channel }
		inputElement.focus()
	}

	$: onInput = () => {
		const { timeRemaining } = form
		if (timeRemaining === null) return
		if (timeRemaining < 1) {
			form = { ...form, timeRemaining: 1 }
		}
		if (`${timeRemaining}`.length > 3) {
			form = { ...form, timeRemaining: +`${timeRemaining}`.substring(0, 3) }
		}
	}

	$: onSubmit = async () => {
		const { channel, timeRemaining } = form
		if (timeRemaining === null) {
			alert('보스 출현까지 남은 시간(분)을 입력해 주세요')
			setTimeout(() => {
				inputElement.focus()
			}, 100)
			return
		}
		if (channel === null) {
			alert('보스가 출현하는 채널을 선택해 주세요')
			return
		}

		const isConfirmed = confirm(
			`${raid.name} 보스를 제보하시겠습니까? \n ${channel}채널 - ${timeRemaining}분 후 출연`
		)
		if (!isConfirmed) return
		await postRaidTime(raid.id, {
			timeRemaining,
			channel,
			server: 'luce'
		})

		isShowForm = false
		form = { channel: null, timeRemaining: null }
		toast.on('보스 제보가 완료되었습니다!')
	}
</script>

{#if !isShowForm}
	<div class="flex-center mt-2 flex-wrap gap-2">
		<p class="text-xs text-gray-300">올바른 보스 제보가 없나요?</p>
		<Button
			on:click={onToggleShowForm}
			size="sm"
			class="bg-primary-50 font-extrabold text-secondary-5"
			rounded="md">보스 제보하기</Button
		>
	</div>
{:else}
	<div class="flex-center mt-2 flex-wrap gap-2">
		<p class="text-xs text-gray-300">
			보스가 출현할 채널과 남은 시간을 입력해주세요
		</p>
		<Button
			on:click={onToggleShowForm}
			size="sm"
			class="bg-gray-700 "
			rounded="md">취소</Button
		>
	</div>
	<section class="mt-2">
		<h2 class="ir">보스 제보</h2>
		<div class="flex flex-col gap-2">
			<Tabs>
				{#each GAME_CHANNELS as channel (channel)}
					<Tab
						isActive={form.channel === channel}
						on:click={() => selectChannel(channel)}
						class="text-xs"
					>
						{channel}채
					</Tab>
				{/each}
			</Tabs>
			<form on:submit={onSubmit} class="flex gap-2">
				<input
					bind:this={inputElement}
					type="number"
					id={`raid-${raid.id}`}
					class={cn(
						'w-full rounded-sm bg-primary-20 px-1 py-[1px] text-xs text-white'
					)}
					step="0.1"
					placeholder="남은 시간(분)"
					bind:value={form.timeRemaining}
					on:input={onInput}
				/>
				<Button type="submit" size="sm" class="point-neon shrink-0">
					+ 보스 제보
				</Button>
			</form>
		</div>
	</section>
{/if}
