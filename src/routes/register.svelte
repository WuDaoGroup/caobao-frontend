<script>
	import { RadioButtonGroup, RadioButton, TextInput, PasswordInput } from 'carbon-components-svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { base } from '$app/paths';
	import { registerApi } from '../api/userApi';
	import { goto } from '$app/navigation';

	let sid;
	let name;
	let password1 = '';
	let password2 = '';
	let info;
	const courses = ['alg', 'oop'];
	let course = courses[0]
	$: console.log(course)

	function handleRegister() {
		if (password1 !== password2) {
			toast.push("两次密码不一致", {
					theme: {
						'--toastBackground': '#F56565',
						'--toastBarBackground': '#C53030'
					}
				});
			return;
		}
		registerApi(sid, name, password1, course, info).then((response) => {
			if (response.status == 200) {
				toast.push('成功注册');
				goto(`/login`);
			} else {
				toast.push(response.data.detail, {
					theme: {
						'--toastBackground': '#F56565',
						'--toastBarBackground': '#C53030'
					}
				});
			}
		});
	}
</script>

<body class="flex flex-col items-center justify-center mt-8">
	<!-- Component Start -->
	<h1 class="font-bold text-2xl">Sign Up</h1>
	<form
		class="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
		on:submit|preventDefault={handleRegister}
	>
		<TextInput
			labelText="学号"
			placeholder="Enter your student id..."
			required
			bind:value={sid}
		/>
		<TextInput
			labelText="姓名"
			placeholder="Enter your name..."
			required
			bind:value={name}
		/>
		<div class="mt-4">
			<RadioButtonGroup
				legendText={"课程"}
				labelPosition="right"
				bind:selected={course}
			>
				{#each courses as p}
					<RadioButton labelText={p} value={p} />
				{/each}
			</RadioButtonGroup>
		</div>

		<div class="mt-4">
			<PasswordInput
				required
				type="password"
				labelText="密码"
				placeholder="Enter password..."
				bind:value={password1}
			/>
		</div>
		<div class="mt-4">
			<PasswordInput
				required
				type="password"
				labelText="确认密码"
				placeholder="Enter password again..."
				bind:value={password2}
			/>
		</div>
		<div class="mt-4">
			<TextInput
				labelText="提建议的地方"
				placeholder="Thanks for your suggestion..."
				required
				bind:value={info}
			/>
		</div>
		<button
			class="flex items-center justify-center h-10 px-6 w-72 bg-blue-600 mt-8 font-semibold text-sm text-blue-100 hover:bg-blue-700"
			type="submit">Register</button
		>
		<div class="flex mt-6 justify-center text-xs">
			<span class="mx-2 text-gray-300">Already have an account?</span>
			<a class="text-blue-400 hover:text-blue-500" href="{base}/login">Sign In</a>
		</div>
	</form>
	<!-- Component End  -->
</body>
