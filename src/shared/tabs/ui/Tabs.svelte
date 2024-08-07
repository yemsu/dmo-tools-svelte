<script lang="ts">
	const { class: className, ...restProps } = $$restProps
</script>

<menu
	class="overflow-hidde md:text-md flex items-center rounded-md bg-gray-700 p-1 text-sm {className}"
	{...restProps}
>
	<slot></slot>
</menu>
