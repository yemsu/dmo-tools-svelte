<script lang="ts">
	import { AuthButton } from '$shared/layout'
	import { cn } from '$shared/lib'
	import { Gnb } from '$shared/ui/gnb'
	import { HeaderLogo } from '$shared/ui/header'
</script>

<header class={cn($$restProps.class)}>
	<HeaderLogo />
	<Gnb class="portrait:hidden" />
	<div class="my-6 border-b border-gray-4 portrait:hidden"></div>
	<AuthButton />
</header>
