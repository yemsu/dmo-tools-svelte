<script lang="ts">
	import { audioAlarm, isAudioOn } from '../model'
	import { Icon } from '$shared/icon'
	import { toast } from '$shared/toast'

	$: toggleAudioAlarm = () => {
		const newIsAudioOn = !$isAudioOn
		isAudioOn.set(newIsAudioOn)
		audioAlarm.set(newIsAudioOn ? new Audio('/sound-alarm.mp3') : undefined)
		toast.on(
			newIsAudioOn
				? '보스 등장 알림음이 활성화 되었습니다.'
				: '보스 등장 알림음이 비활성화 되었습니다.'
		)
	}
</script>

<button
	class="button-hover h-full bg-primary-30 px-2"
	title={$isAudioOn ? '알림음 활성화 상태' : '알림음 비활성화 상태'}
	on:click={toggleAudioAlarm}
>
	<Icon icon="mdi:bell{$isAudioOn ? '' : '-off'}" width={14} height={14} />
</button>
