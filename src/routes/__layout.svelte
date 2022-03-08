<script>
	import '../app.css';
	import 'carbon-components-svelte/css/white.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	const options = {
		theme: {
			'--toastBackground': '#48BB78',
			'--toastBarBackground': '#2F855A'
		}
	};
	import {
		Header,
		HeaderUtilities,
		HeaderAction,
		HeaderPanelLinks,
		HeaderPanelDivider,
		HeaderPanelLink,
		SideNav,
		SideNavItems,
		SideNavLink,
		Content
	} from 'carbon-components-svelte';
	import UserAvatarFilledAlt20 from 'carbon-icons-svelte/lib/UserAvatarFilledAlt20';

	let isSideNavOpen = false;
	let isOpen1 = false;

	// show username in svelte/store
	import { base } from '$app/paths';
	import { user } from '../stores/userStore';
	let name;
	user.subscribe((value) => {
		name = value.name;
	});
</script>

<Header
	persistentHamburgerMenu={false}
	href="{base}/"
	company="漕宝"
	platformName="CaoBao"
	bind:isSideNavOpen
>
	<HeaderUtilities>
		<HeaderAction
			bind:isOpen={isOpen1}
			icon={UserAvatarFilledAlt20}
			closeIcon={UserAvatarFilledAlt20}
		>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Hi, {name}</HeaderPanelDivider>
				<HeaderPanelLink href="{base}/login">登录 | Sign In</HeaderPanelLink>
				<HeaderPanelLink href="{base}/register">注册 | Sign Up</HeaderPanelLink>
				<HeaderPanelLink href="{base}/record">提交记录</HeaderPanelLink>
				<HeaderPanelLink href="{base}/profile">Profile</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink text="算法课程" href="{base}/alg" />
		<SideNavLink text="面向对象课程" href="{base}/oop" />
	</SideNavItems>
</SideNav>

<Content>
	<SvelteToast {options} />
	<slot />
</Content>
