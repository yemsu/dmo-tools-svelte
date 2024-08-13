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
	import { Title } from '$shared/text'

	export let raid: RaidData

	type Form = {
		channel: GameChannel
		timeRemaining: number | null
	}

	let form: Form = {
		channel: 0,
		timeRemaining: null
	}
	let inputElement: HTMLInputElement
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
		const { timeRemaining } = form
		if (timeRemaining === null) {
			alert('보스 출현까지 남은 시간(분)을 입력해 주세요')
			setTimeout(() => {
				inputElement.focus()
			}, 100)
		} else {
			const isConfirmed = confirm(
				`${raid.name}를 제보하시겠습니까? \n ${form.channel}채널 - ${form.timeRemaining}분 후 출연`
			)
			if (!isConfirmed) return
			const res = await postRaidTime(raid.id, {
				timeRemaining,
				channel: form.channel,
				server: 'luce'
			})
			console.log('res', res)
			onBlurInput()
		}
	}

	const onBlurInput = () => {
		setTimeout(() => {
			form = { channel: 0, timeRemaining: null }
		}, 100)
	}
</script>

<section>
	<Title>{raid.name} 제보하기</Title>
	<div class="flex flex-col gap-2">
		<Tabs>
			{#each GAME_CHANNELS as channel (channel)}
				<Tab
					isActive={form.channel === channel}
					on:click={() => selectChannel(channel)}
					class="text-xs"
					>{channel}채
				</Tab>
			{/each}
		</Tabs>
		<form on:submit|preventDefault={onSubmit} class="flex gap-2">
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
				on:blur|once={onBlurInput}
			/>
			<Button type="submit" size="sm" class="point-neon shrink-0">
				+ 보스 제보
			</Button>
		</form>
	</div>
</section>
