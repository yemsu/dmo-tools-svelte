<script lang="ts">
	import { Button } from '$shared/button'
	import { Icon } from '$shared/icon'
	import { Tooltip } from '$shared/tooltip'

	export let id: string
</script>

<div class={$$restProps.class}>
	<Button size="icon" variant="ghost" class="peer/tooltip">
		<Icon
			icon="mdi:warning-decagram"
			class="text-warning"
			aria-describedby={id}
			size="1.5em"
		/>
	</Button>
	<Tooltip as="p" {id} class="whitespace-nowrap">
		같은 채널에 여러 제보가 있습니다! <br />
		가장 근접한 제보에 좋아요🤍를 눌러주세요.
	</Tooltip>
</div>
