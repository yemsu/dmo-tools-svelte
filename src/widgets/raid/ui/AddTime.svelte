<script lang="ts">
	import {
		crrServerType,
		GAME_SERVERS,
		postRaidTime,
		subscribeClientId,
		type GameChannel,
		type RaidData
	} from '$entities/raid'
	import Button from '$shared/button/ui/Button.svelte'
	import { Input } from '$shared/form'
	import { Tab, Tabs } from '$shared/tabs'
	import { toast } from '$shared/toast'

	export let raid: RaidData
	export let raidChannels: GameChannel[]
	let isShowForm = false

	type Form = {
		channel: GameChannel | null
		timeRemaining: number | null
	}

	const defaultForm: Form = {
		channel: null,
		timeRemaining: null
	}

	let form = defaultForm
	let inputElement: HTMLInputElement

	const onToggleShowForm = () => {
		if (raidChannels.length === 1) {
			form = { ...form, channel: raidChannels[0] }
		}
		isShowForm = !isShowForm
		setTimeout(() => {
			inputElement && inputElement.focus()
		}, 60)
	}

	const selectChannel = (channel: GameChannel) => {
		form = { ...form, channel }
		inputElement.focus()
	}

	const hideForm = () => {
		isShowForm = false
	}

	$: onInput = () => {
		const { timeRemaining } = form
		if (timeRemaining === null) return
		if (`${timeRemaining}`.length > 3) {
			form = { ...form, timeRemaining: +`${timeRemaining}`.substring(0, 3) }
		}
	}

	$: onSubmit = async () => {
		const { channel, timeRemaining } = form
		if (!$subscribeClientId) {
			throw Error('onSubmit: subscribeClientId 정보가 없습니다.')
		}
		if (timeRemaining === null || timeRemaining < 1) {
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
		if (!$crrServerType) {
			alert('현재 서버 정보가 없습니다. 새로고침 후 다시 시도해주세요.')
			return
		}

		const isConfirmed = confirm(
			`보스를 제보하시겠습니까? \n [${GAME_SERVERS[$crrServerType]} 서버] ${raid.name} - [${channel}채널] ${timeRemaining}분 후 출현`
		)
		if (!isConfirmed) return
		await postRaidTime(raid.id, {
			timeRemaining,
			channel,
			server: $crrServerType,
			clientId: $subscribeClientId
		})

		hideForm()
		form = { channel: null, timeRemaining: null }
		toast.on('보스 제보가 완료되었습니다!')
	}
</script>

{#if !isShowForm}
	<div class="flex-center mt-2 flex-wrap gap-2">
		<p class="text-sub-md text-gray-300">올바른 보스 제보가 없나요?</p>
		<Button
			on:click={onToggleShowForm}
			size="sm"
			class="bg-primary-50 font-bold text-secondary-5"
			rounded="md">보스 제보하기</Button
		>
	</div>
{:else}
	<div class="mt-2 flex items-center justify-between gap-2">
		<p class="break-keep text-sub-md text-gray-300">
			{#if raidChannels.length > 1}
				보스가 출현할 채널과 남은 시간을 입력해주세요
			{:else}
				보스 출현까지 남은 시간을 입력해주세요
			{/if}
		</p>
		<Button
			on:click={onToggleShowForm}
			size="sm"
			class="bg-gray-5 "
			rounded="md">취소</Button
		>
	</div>
	<section class="mt-2">
		<h2 class="ir">보스 제보</h2>
		<div class="flex flex-col gap-2">
			{#if raidChannels.length > 1}
				<Tabs>
					{#each raidChannels as channel (channel)}
						<Tab
							isActive={form.channel === channel}
							on:click={() => selectChannel(channel)}
							class="flex-center"
						>
							{channel}
							<span class="hidden text-sub-md font-normal md:inline">채널</span>
							<span class="text-sub-lg font-normal md:hidden">채널</span>
						</Tab>
					{/each}
				</Tabs>
			{/if}
			<form on:submit|preventDefault={onSubmit} class="flex gap-2">
				<Input
					bind:inputElement
					type="number"
					id={`raid-${raid.id}`}
					step="0.1"
					placeholder="남은 시간(분)"
					size="sm"
					bind:value={form.timeRemaining}
					on:input={onInput}
				/>
				<Button
					type="submit"
					size="sm"
					rounded="md"
					class="point-neon shrink-0"
				>
					+ 보스 제보
				</Button>
			</form>
		</div>
	</section>
{/if}
<p class="mt-4 text-center text-sub-md font-semibold text-warning">
	허위제보 시 <br class="md:hidden" />사이트 이용이 제한될 수 있습니다
</p>
