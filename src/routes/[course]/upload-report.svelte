<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>实验报告提交</title>
</svelte:head>

<script context="module">
	import { baseLink } from '../../services/api.js';
	// import {querySingleProblemApi} from '../../api/problemApi';
	import {timeConverter} from '../../services/time.js';
	export const prerender = true;

	export async function load({ params }) {
		const course = params.course;
		return {
			props: {
				course,
			}
		};
	}
</script>

<script>
    export let course;

    import {
		Button,
		DataTable,
		Pagination,
		Select,
		SelectItem,
		InlineNotification,
		ProgressIndicator,
		ProgressStep,
		TextInput,
		Tabs,
		Tab,
		TabContent
	} from 'carbon-components-svelte';
    import { toast } from '@zerodevx/svelte-toast';
    let labs = ['第一次作业']
    let selectedLab = labs[0]

    // store中获取user
    import { user } from '../../stores/userStore';
    let sid = 123
    user.subscribe((value) => {
		sid = value.sid;
	});

    console.log('sid:', sid)

    // 上传FilePond
    import FilePond from 'svelte-filepond';
    let pond;
	// the name to use for the internal file input
	let name = 'upload_file'; // 这个值就对应了form-data的key
	// handle filepond events
    let uploadPdfApiLink = `${baseLink}/api/v1/files/upload/${sid}/${course}/labs/${selectedLab}`;
	function handleInit() {
		console.log('FilePond has initialised');
	}
	
	function handleAddFile(err, fileItem) {
		console.log('A file has been added', fileItem);
		if (!['pdf'].includes(fileItem.fileExtension.toLowerCase())) {
			(checkUploadFiles.invalid = true);
			toast.push('文件类型错误，需是pdf文件', {
				theme: {
					'--toastBackground': '#F56565',
					'--toastBarBackground': '#C53030'
				}
			});
			fileItem.abortLoad();
			fileItem.abortProcessing();
		} else {
			toast.push('点击上传');
		}
	}

</script>

<h1>提交实验报告</h1>

<div class="alert shadow-lg mt-4">
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-info flex-shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span class="flex items-center ml-1">作业内容要求：(1) 介绍对题目的分析思路，(2) 伪代码说明实现过程，(3) 根据计算过程分析时间复杂度，需要有分析过程，不要直接给结果。以“墩墩数数”这题为例，点击<a href="https://www.overleaf.com/read/qcdjfyjrwjmm">参考的提交内容链接</a>查看详情。</span>
    </div>
  </div>

<div class="mt-4">

    

</div>


<div class="grid grid-cols-2 gap-4 w-full">
	<div class="grid flex-grow card rounded-box">
		<Tabs>
			<Tab label="选择提交作业" />

			<svelte:fragment slot="content">
				<TabContent>
					<div class="hero bg-base-200 h-[32rem]">
						<div class="hero-overlay bg-opacity-60 rounded-lg" />
						<div class="hero-content text-left text-neutral-content">
							<div class="max-w-md">
								<h2 class="mb-5 text-5xl font-bold">作业提交入口</h2>
								<p class="mb-5">
									请选择是哪一次作业，新上传的作业会覆盖旧的作业。
								</p>
								<div class="flex items-end justify-between px-4 pt-4 items-center">
									<select class="select select-bordered w-30 text-zinc-900 w-[14rem]" bind:value={selectedLab}>
										{#each labs as opt}
										<option value={opt} class="font-mono">
										  {opt}
										  </option>
										{/each}
									</select>
                                    <button class="btn btn-primary w-[6rem]" on:click={()=>{toast.push('确认成功')}}>
										确定
									</button>
								</div>
							</div>
						</div>
					</div>
				</TabContent>

			</svelte:fragment>
		</Tabs>
	</div>

	<div class="grid flex-grow card rounded-box">
		<Tabs>
			<Tab label="OverLeaf 教学" />
			<svelte:fragment slot="content">
			<TabContent>
				<div class="px-4 mx-auto container align-middle h-[32rem]">
                    <div class="mt-4">
                        <FilePond
                            bind:this={pond}
                            labelIdle='Drag & Drop your assignment (pdf format) or <span class="filepond--label-action"> Browse </span>'
                            {name}
                            server={uploadPdfApiLink}
                            allowMultiple={true}
                            oninit={handleInit}
                            onaddfile={handleAddFile}
                            instantUpload={false}
                        />
                    </div>

					<div class="flex flex-row justify-center items-center">
						<iframe src="//player.bilibili.com/player.html?aid=424765556&bvid=BV1k3411W7ek&cid=549700885&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" title="Overleaf & LaTex 基础入门" class="rounded-lg mt-4 w-[32rem] h-[18rem]"> </iframe>
					</div>
				</div>
			</TabContent>
			</svelte:fragment>
		</Tabs>
	</div>
</div>

<style>
	@import 'filepond/dist/filepond.css';
</style>
