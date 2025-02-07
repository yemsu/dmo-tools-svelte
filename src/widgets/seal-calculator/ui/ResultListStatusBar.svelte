<script lang="ts">
	import { calc } from '$features/calculate-seal-efficiency'
	import { cn, intersectionObserver } from '$shared/lib'
	import { Switch } from '$shared/ui/switch'
	import { CalcReferText } from '$widgets/seal-calculator'
	import { _ } from 'svelte-i18n'

	let isStatusBarHide = false

	const onMergeSwitchChange = (e: CustomEvent) => {
		calc.toggleViewMode(e.detail)
	}

	const onStatusBarHide = (isIntersecting: boolean) => {
		isStatusBarHide = !isIntersecting
	}
</script>

<div
	class="observer-target mb-2"
	use:intersectionObserver={{
		target: '.observer-target',
		threshold: 0,
		rootMargin: '0px',
		onIntersect: onStatusBarHide
	}}
>
	<div
		class={cn(
			'flex items-center justify-between',
			isStatusBarHide &&
				'fixed left-[--result-l] top-[calc(var(--header-h)+var(--raid-bar-h))] z-toast w-[var(--result-area-w)] bg-background py-3 land:top-0'
		)}
	>
		<CalcReferText />
		<div class="flex gap-4">
			{#if import.meta.env.DEV}
				<Switch
					id="merge-switch"
					leftText={$_('seal.separate_same_seal')}
					rightText={$_('seal.merge_same_seal')}
					defaultChecked={$calc.viewMode === 'merged'}
					width="3em"
					on:change={onMergeSwitchChange}
				/>
			{/if}
		</div>
	</div>
</div>
