<script lang="ts">
	import { mySeals } from '$entities/seals'
	import { isShowMySealPopup } from '$entities/seals'
	import { Inner } from '$shared/section'
</script>

<header>
	<Inner size="full" class="h-header-h flex items-center justify-between">
		<h1 class="relative font-tiny text-3xl font-bold tracking-[0.05em]">
			<span class="text-logo">DMO tools</span>
		</h1>
		<button
			class="rounded-md bg-primary-30 px-2 py-1 text-sm font-bold"
			on:click={() => isShowMySealPopup.set(true)}
			title="자세히 보기"
		>
			보유중인 씰 ({$mySeals.length})
		</button>
	</Inner>
</header>
