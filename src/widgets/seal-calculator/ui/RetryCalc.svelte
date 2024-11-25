<script lang="ts">
	import { Button } from '$shared/button'
	import { cn } from '$shared/lib'
	import { TextByLang } from '$shared/text'
	import { onMount } from 'svelte'

	let buttonElement: HTMLButtonElement

	onMount(() => {
		setTimeout(() => {
			buttonElement.focus()
		}, 100)
	})
</script>

<div
	class={cn(
		'absolute left-0 top-0',
		'flex size-full flex-col items-center gap-4',
		'bg-gray-3/60 pt-[100px] backdrop-blur-sm'
	)}
>
	<p class="text-balance break-keep text-center">
		<TextByLang
			text="씰 가격이 업데이트 되었습니다. <br /> 아래 버튼을 클릭하여 다시 계산해주세요!"
			engText="The seal prices have been updated after the efficiency calculation. Please click the button below to recalculate!"
		/>
	</p>
	<Button bind:element={buttonElement} variant="blue" size="lg" on:click>
		<TextByLang text="계산 다시하기" engText="Recalculate the values." />
	</Button>
</div>
