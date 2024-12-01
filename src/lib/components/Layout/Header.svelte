<script lang="ts">
	import eLibLogo from '$assets/app-logo.svg';
	import { Button } from '$components';
	import { getUserState } from '$lib/state/user-state.svelte';

	let userContext = getUserState();
	let { user } = $derived(userContext);

	$inspect(user);
</script>

<header>
	<a href="/">
		<img class="logo" src={eLibLogo} alt="Home" />
	</a>
	<nav>
		{#if !user}
			<ul>
				<li>
					<Button href="/register" isMenu>Create account</Button>
				</li>
				<li>
					<Button href="/login" isMenu isSecondary>Login</Button>
				</li>
			</ul>
		{:else}
			<ul>
				<li>
					{user.email}
				</li>
				<li>
					<Button onclick={() => userContext.logout()} isMenu>Logout</Button>
				</li>
			</ul>
		{/if}
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 4vw;
	}

	ul {
		display: flex;
		align-items: center;
		column-gap: 24px;
	}

	.logo {
		height: 72px;
	}
</style>
