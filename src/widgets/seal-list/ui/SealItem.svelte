<script lang="ts">
	import type { SealData } from '$entities/seals'

	export let seal: SealData
	export let count: number | undefined = undefined
</script>

<span class="flex flex-col p-2">
	<span class="text-balance break-keep font-bold">
		{seal.name}
	</span>
	<span>
		<span>
			[ {seal.statType} ]
		</span>
		{seal.maxIncrease}</span
	>
	<span>{count ? count : ''}</span>
</span>
