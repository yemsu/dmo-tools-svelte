<script lang="ts">
	import type { Seal } from '$widgets/select-seal-form/config'

	export let seal: Seal
	export let count: number | undefined = undefined
</script>

<span>
	{seal.name}
	{seal.stat}
	{seal.maxValue}
	{count ? count : ''}
</span>
