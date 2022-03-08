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
			}
		};
	}
</script>


<script>
	import { goto } from '$app/navigation';
	import { timeConverter } from '../../services/time.js';

	export let problemList;
	// console.log('problemsList!:', problemList);

</script>

<div class="flex flex-col w-full">
	<h1>Problems</h1>
	<div class="divider" />
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
						<button class="btn btn-outline btn-success" on:click={() => goto('alg/' + problem.id)}
							>前往</button
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
