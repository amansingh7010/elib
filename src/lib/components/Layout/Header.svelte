<script lang="ts">
	import eLibLogo from '$assets/app-logo.svg';
	import { Button } from '$components';
</script>

<header>
	<a href="/">
		<img class="logo" src={eLibLogo} alt="Home" />
	</a>
	<nav>
		<ul>
			<li>
				<Button href="/register" isMenu>Create account</Button>
			</li>
			<li>
				<Button href="/login" isMenu isSecondary>Login</Button>
			</li>
		</ul>
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
		column-gap: 24px;
	}

	.logo {
		height: 72px;
	}
</style>
