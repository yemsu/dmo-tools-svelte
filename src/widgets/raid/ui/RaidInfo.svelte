<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'

	export let raid: RaidData
	const { class: className, ...restProps } = $$restProps
</script>

<dl
	class={cn(
		'grid grid-cols-2 gap-1 break-keep p-2 md:grid-cols-7 md:gap-2 ',
		className
	)}
	{...restProps}
>
	<div class="col-span-2 md:col-span-3">
		<dt class="text-[10px] text-gray-300">레이드명</dt>
		<dd class="text-xs">{raid.name}</dd>
	</div>
	<div class="col-span-2 md:col-span-2">
		<dt class="text-[10px] text-gray-300">위치</dt>
		<dd class="text-xs">{raid.location}</dd>
	</div>
	<div class="col-span-1">
		<dt class="text-[10px] text-gray-300">채널</dt>
		<dd class="text-xs">????</dd>
	</div>
	<div class="col-span-1">
		<dt class="text-[10px] text-gray-300">남은시간</dt>
		<dd class="text-xs">????</dd>
	</div>
</dl>
