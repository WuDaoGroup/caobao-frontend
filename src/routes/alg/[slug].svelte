<style>
	@import 'filepond/dist/filepond.css';
</style>

<script context="module">
	import { baseLink } from '../../services/api.js'
	export const prerender = true;
	export async function load({ fetch, params }) {
		let question;
		try {
			// here we are gonna fetch the single article by id
			question = await fetch(`${baseLink}/static/alg/${params.slug}.md`);
            question = await question.text()
			
		} catch (e) {
			console.log(e);
		}
		return {
			props: {
                question,
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
    export let question;
	const source = question;

	let pond;
	let filename;
	// the name to use for the internal file input
	let uploadApiLink = `${baseLink}/api/v1/files/upload`
	let name = 'upload_file'; // 这个值就对应了form-data的key
	// handle filepond events
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
				console.log(response.data)
				toast.push("评测输出是: "+response.data.output);
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

<h1>题目</h1>

<SvelteMarkdown {source} />

<div class="grid grid-rows-2 grid-cols-5 gap-4 mt-10">
	<div class="row-span-2 col-span-4">
		<FilePond
			bind:this={pond}
			labelIdle='Drag & Drop your data (py file, 测试上传Python代码) or <span class="filepond--label-action"> Browse </span>'
			{name}
			server={uploadApiLink}
			allowMultiple={true}
			oninit={handleInit}
			onaddfile={handleAddFile}
			instantUpload={false}
		/>
	</div>
	<div class=" m-auto">
		<Button on:click={commitJudge} kind="tertiary">提交评测</Button>
	</div>
</div>