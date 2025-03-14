<script lang="ts">
	import {
		crrServerType,
		GAME_SERVERS,
		postRaidTime,
		subscribeClientId,
		type GameChannel,
		type RaidData
	} from '$entities/raid'
	import { user } from '$entities/user'
	import { ADD_RAID_SCHEMA } from '$features/raid/update-raid-time/config/schema'
	import { Button } from '$shared/button'
	import { CONFIRM } from '$shared/config'
	import { ToggleFormWrap } from '$shared/form'
	import ValidationText from '$shared/form/ui/ValidationText.svelte'
	import { Icon } from '$shared/icon'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'

	export let raid: RaidData
	export let channel: GameChannel
	let value = ''
	let isValid: boolean = false

	const setIsValid = (_isValid: boolean) => {
		isValid = _isValid
	}

	const reset = () => {
		value = ''
	}

	$: onInput = () => {
		if (value === '') return
		if (value.length > 3) {
			value = `${value}`.substring(0, 3)
		}
	}

	$: onsubmit = async () => {
		if (!$subscribeClientId) {
			alert('Client Id 정보가 없습니다. 새로고침 후 재시도 해주세요.')
			return
		}
		const isConfirmed = confirm(
			CONFIRM.ADD_RAID_TIME(
				{
					serverName: GAME_SERVERS[$crrServerType],
					raidName: raid.name,
					channel,
					minute: value
				},
				!!$user
			)[$lang]
		)
		if (!isConfirmed) return
		await postRaidTime(raid.id, {
			timeRemaining: +value,
			channel,
			server: $crrServerType,
			clientId: $subscribeClientId
		})
		value = ''
		toast.on('보스 제보가 완료되었습니다!')
	}
</script>

<ToggleFormWrap
	bind:value
	type="number"
	id={`raid-${raid.id}`}
	step="0.1"
	placeholder="남은 시간(분)"
	on:input={onInput}
	{isValid}
	{onsubmit}
	{reset}
>
	<Button
		slot="button"
		{...$$restProps}
		variant="ghost"
		size="sm"
		class="group"
		let:clickEditOn
		on:click={clickEditOn}
	>
		<span class="flex-center group-hover:scale-150 group-hover:text-point">
			+ <Icon icon="mdi:dinosaur-pixel" size="1.3em" class="scale-x-[-1]" />
		</span>
	</Button>
	<ValidationText
		slot="validationText"
		{value}
		{setIsValid}
		schema={ADD_RAID_SCHEMA}
	/>
</ToggleFormWrap>
