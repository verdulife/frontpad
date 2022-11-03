<script>
	import { page } from '$app/stores';
	import { customURL } from '$lib/stores';
	import Main from '$lib/components/Main.svelte';

	const { custom_url } = $page.params;
	$customURL = custom_url;
</script>

<Main />
