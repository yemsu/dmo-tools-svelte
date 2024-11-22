<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { Modal } from '$shared/modal'
</script>

<div>
	<p>
		Are you having trouble using the site? <br />
		Please fill out the information below and email us at
		<a href="mailto:sssjsjj@gmail.com" class="text-point" title="Mail to">
			sssjsjj@gmail.com.
		</a> <br />
		We'll do our best to resolve the issue!
	</p>
	<div class="flex-center mt-4 rounded-sm border border-gray-3 p-3">
		<ol class="text-body-sm1 flex flex-col gap-2">
			<li>1. DMO-tools username:</li>
			<li>2. User country:</li>
			<li>3. Browser used:</li>
			<li class="flex flex-col gap-2">
				4. Device type (PC/Mobile):
				<dl class="flex flex-col gap-2 pl-3">
					<dt>👉 if Device type is "Mobile"</dt>
					<div class="flex flex-col gap-2 pl-3">
						<dd>4-1. Device Model (if Mobile Device):</dd>
						<dd>4-2. OS (window/ios/android/etc):</dd>
						<dd>4-3. OS version:</dd>
					</div>
				</dl>
			</li>
			<li>5. Description of the Issue:</li>
		</ol>
	</div>
</div>
