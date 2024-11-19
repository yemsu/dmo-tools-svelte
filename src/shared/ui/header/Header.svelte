<script lang="ts">
	import { AuthButton } from '$shared/layout'
	import { cn } from '$shared/lib'
	import { HeaderLogo } from '$shared/ui/header'
</script>

<header class={cn($$restProps.class)}>
	<HeaderLogo />
	<slot></slot>
	<AuthButton />
</header>
