<style>
	@import 'filepond/dist/filepond.css';
</style>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<script context="module">
	import { baseLink } from '../../services/api.js';
	export const prerender = true;
	export async function load({ fetch, params }) {
		let problem;
		try {
			// here we are gonna fetch the single article by id
			problem = await fetch(`${baseLink}/static/alg/${params.slug}/question.md`);
            problem = await problem.text()
			
		} catch (e) {
			console.log(e);
		}
		return {
			props: {
                problem,
				slug: params.slug
			}
		};
	}
</script>

<script>
	import {judgeApi} from '../../api/judgeApi'
	import { toast } from '@zerodevx/svelte-toast';
	import {
		Button,
		DataTable,
		Pagination,
		RadioButtonGroup,
		RadioButton,
		InlineNotification,
		ProgressIndicator,
		ProgressStep
	} from 'carbon-components-svelte';
	import SvelteMarkdown from 'svelte-markdown'
	import FilePond from 'svelte-filepond';
    export let problem;
	export let slug;
	const source = problem;

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

	let uploadApiLink = `${baseLink}/api/v1/files/upload/${sid}/alg/${slug}`;

	function handleInit() {
		console.log('FilePond has initialised');
	}
	
	function handleAddFile(err, fileItem) {
		console.log('A file has been added', fileItem);
		if (!['py'].includes(fileItem.fileExtension.toLowerCase())) {
			(checkUploadFiles.invalid = true);
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
		judgeApi(filename).then((response) => {
			if (response.status == 200) {
				// console.log(response.data)
				// toast.push("评测输出是: "+response.data.output);
				toast.push("正在评测");
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
			<h2 class="text-sm font-medium">题目: {slug}</h2>
			<div class="bg-white rounded mt-4 shadow-lg p-4">
				<SvelteMarkdown {source} />
			</div>
		</div>
		<div>
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

					<div class="px-8 mt-4 border-t pt-4">
						<div class="flex items-end justify-between">
							<span class="font-semibold">当前状态:</span>
							<span class="font-semibold text-sky-400">{result}</span>
						</div>
					</div>
					<div class="flex flex-col px-8 pt-4">
						<button class="flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700" on:click={commitJudge}>提交评测</button>
					</div>
			</div>
		</div>
	</div>

</problem>