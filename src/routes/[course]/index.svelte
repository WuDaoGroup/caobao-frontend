<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>课程题目列表</title>
</svelte:head>

<script context="module">
	import { queryProblemsApi } from '../../api/problemApi';

	export const prerender = true;
	export async function load({ params }) {
		const course = params.course;
		let problemList;
		// console.log(params)
		problemList = await queryProblemsApi(course).then((res) => 
			res.data
		);
		// console.log(problemList);
		return {
			props: {
				problemList,
				course,
			}
		};
	}
</script>


<script>
	import { goto } from '$app/navigation';
	import { timeConverter } from '../../services/time.js';

	export let problemList;
	export let course;
	// console.log('problemsList!:', problemList);
	console.log(course)

</script>

<div class="flex flex-col w-full">

	<div class="flex justify-between ...">
		<h1>Problems</h1>
		<button class="btn btn-outline btn-info" on:click={() => goto(`${course}/upload-report`)}
			>实验报告提交入口</button
		>
	</div>
	

	

	<div class="divider" />
	{#if problemList.length == 0}
		<p>No problems found</p>
	{/if}

	<div class="container mx-auto bg-gray-50 rounded p-2 antialiased">
		{#each problemList as problem}
			<div class="bg-gray-100 mx-auto border-gray-500 border rounded my-2 text-gray-700">
				<div class="flex p-3  border-l-8 border-green-600">
					<div class="space-y-1 border-r-2 pr-3">
						<div class="text-sm leading-5 font-semibold">
							<span class="text-xs leading-4 font-normal text-gray-500"> 题目 ID #</span>
							{problem.id}
						</div>
						<div class="text-sm leading-5 font-semibold">
							<span class="text-xs leading-4 font-normal text-gray-500 pr"> 开始 </span>
							{timeConverter(problem.begin)}
						</div>
						<div class="text-sm leading-5 font-semibold">
							<span class="text-xs leading-4 font-normal text-gray-500 pr"> 结束 </span>
							{timeConverter(problem.end)}
						</div>
					</div>
					<div class="flex-1">
						<div class="ml-3 space-y-1 border-r-2 pr-3">
							<div class="text-base leading-6 font-normal text-xl font-bold">{problem.title}</div>
							<div class="text-sm leading-4 font-normal">
								<span class="text-xs leading-4 font-normal text-gray-500"> Description</span>
								{problem.description}
							</div>
							<div class="text-sm leading-4 font-normal">
								<span class="text-xs leading-4 font-normal text-gray-500"> Language</span>
								{JSON.parse(problem.language)}
							</div>
						</div>
					</div>
					<div class="flex items-center">
						<button class="btn btn-outline btn-success" on:click={() => goto(`${course}/${problem.id}`)}
							>前往</button
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
