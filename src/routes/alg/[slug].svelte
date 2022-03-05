<style>
	@import 'filepond/dist/filepond.css';
</style>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<script context="module">
	import { baseLink } from '../../services/api.js';
	// import {querySingleProblemApi} from '../../api/problemApi';
	import {timeConverter} from '../../services/time.js';
	export const prerender = true;

	export async function load({ fetch, params }) {
		let problemContentHtml;
		let problem;
		try {

			problem = await fetch(`${baseLink}/api/v1/problems/single/${params.slug}`).then((res) => res.json());;
			console.log('problem:',problem)
			// here we are gonna fetch the single article by id
			problemContentHtml = await fetch(`${baseLink}/static/alg/${problem.address}/question.md`);
            problemContentHtml = await problemContentHtml.text()
			
		} catch (e) {
			console.log(e);
		}
		return {
			props: {
				problem,
                problemContentHtml,
				slug: params.slug
			}
		};
	}
</script>

<script>
	import { judgeApi } from '../../api/judgeApi'
	import { toast } from '@zerodevx/svelte-toast';
	
	import {
		Button,
		DataTable,
		Pagination,
		RadioButtonGroup,
		RadioButton,
		InlineNotification,
		ProgressIndicator,
		ProgressStep,
		Select, SelectItem
	} from 'carbon-components-svelte';
	import SvelteMarkdown from 'svelte-markdown'
	import FilePond from 'svelte-filepond';
	export let problem;
	// console.log('problem_detail:', problem)

	export let problemContentHtml;
	export let slug;
	const source = problemContentHtml;
	let languages = JSON.parse(problem.language)
	// console.log('language:', languages)
	let selectedLanguage;
	let result = "尚未评测";
	let pond;
	let filename;
	// the name to use for the internal file input
	
	let name = 'upload_file'; // 这个值就对应了form-data的key
	// handle filepond events

	import { user } from '../../stores/userStore';
	let sid;
	user.subscribe((value) => {
		sid = value.sid;
	});

	let uploadApiLink = `${baseLink}/api/v1/files/upload/${sid}/alg/${problem.address}`;

	function handleInit() {
		console.log('FilePond has initialised');
	}
	
	function handleAddFile(err, fileItem) {
		console.log('A file has been added', fileItem);
		console.log('extension:', fileItem.fileExtension.toLowerCase())
		if (!languages.includes(fileItem.fileExtension.toLowerCase())) {
			toast.push('文件类型错误', {
				theme: {
					'--toastBackground': '#F56565',
					'--toastBarBackground': '#C53030'
				}
			});
			fileItem.abortLoad();
			fileItem.abortProcessing();
		} else {
			toast.push('点击上传');
			filename = fileItem.filename
		}
	}

	function commitJudge(){
		console.log('filename', filename)
		judgeApi(sid, 'alg', problem.address, selectedLanguage, problem.testcase_num).then((response) => {
			if (response.status == 200) {
				console.log(response.data.compile_result)
				toast.push(response.data.compile_result)
				if (response.data.compile_result != "Compile Success"){
					return;
				}
				let acNum = 0;
				for (let i = 0; i < response.data.testcases_detail.length; i++) {
					console.log(response.data.testcases_detail[i]['result'])
					if (response.data.testcases_detail[i]['result'] == 'Accepted') {
						acNum++;
					}
					toast.push(`测试点${i+1}: ${response.data.testcases_detail[i]['result']}`)
				}
				result = `${acNum} / ${problem.testcase_num}`
				
			} else {
				toast.push("评测失败", {
					theme: {
						'--toastBackground': '#F56565',
						'--toastBarBackground': '#C53030'
					}
				});
			}
		});
	}

</script>

<problem class="flex items-center justify-center text-gray-800 p-2">

	<!-- Component Start -->
	<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
		<div class="lg:col-span-2">
			<h2 class="text-sm font-medium">题目: {problem.title}</h2>
			<div class="bg-white rounded mt-4 shadow-lg p-4 min-h-fit">
				<SvelteMarkdown {source} />
			</div>
		</div>
		<div>
			<h2 class="text-sm font-medium">题目信息</h2>
			<div class="bg-white rounded mt-4 shadow-lg py-4">
					<div class=" stats flex flex-col">
						<div class="stat">
						  <div class="stat-title">开始时间:</div>
						  <div class="text-emerald-700 font-bold text-sm">{timeConverter(problem.begin)}</div>
						</div>
						
						<div class="stat">
						  <div class="stat-title">截止时间:</div>
						  <div class="text-emerald-700 font-bold text-sm">{timeConverter(problem.end)}</div>
						</div>
						
						<div class="stat">
						  <div class="stat-title">测试样例个数:</div>
						  <div class="text-emerald-700 font-bold text-lg">{problem.testcase_num}</div>
						</div>
						<div class="stat">
							<div class="stat-title">题目描述:</div>
							<div class="text-emerald-700 font-bold text-lg">{problem.description}</div>
						</div>
				</div>
		</div>
		<div class="mt-4">
			<h2 class="text-sm font-medium">评测区</h2>
			<div class="bg-white rounded mt-4 shadow-lg py-6">
				<div class="px-8">
					<FilePond
						bind:this={pond}
						labelIdle='拖拽上传Python代码 or <span class="filepond--label-action"> 浏览... </span>'
						{name}
						server={uploadApiLink}
						allowMultiple={true}
						oninit={handleInit}
						onaddfile={handleAddFile}
						instantUpload={false}
					/>
				</div>
				<div class="px-8 mt-4">

					<div class="px-4 mt-4 border-t pt-4">
						<div class="flex items-end justify-between">
							<span class="font-semibold">当前状态:</span>
							<span class="font-semibold text-emerald-700">{result}</span>
						</div>
					</div>
					<div class="flex items-end justify-between px-4 pt-4 items-center">
						<select class="select select-bordered w-30" bind:value={selectedLanguage}>
							{#each languages as lang}
							<option value={lang} class="font-mono">
								{lang}
								</option>
							{/each}
						</select>
						<button class="bg-blue-600 text-sm font-medium w-20 h-12 rounded text-blue-50 hover:bg-blue-700" on:click={commitJudge}>提交评测</button>
					</div>
			</div>
		</div>
	</div>

</problem>