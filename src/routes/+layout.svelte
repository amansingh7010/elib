<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { Header } from '$components';
	import { setUserState } from '$lib/state/user-state.svelte';
	import '../app.css';

	let { children, data } = $props();
	let { session, supabase, user } = $derived(data);

	let userState = setUserState({ session: data.session, supabase: data.supabase, user: data.user });

	$effect(() => {
		userState.updateState({ session, supabase, user });
	});

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Header />
{@render children()}
