<script>
	import { DataTable, Pagination } from 'carbon-components-svelte';
	import { timeConverter } from '../services/time.js';
	import { onMount } from 'svelte';
	import { user } from '../stores/userStore';
	import { queryJudgeRecordsApi } from '../api/judgeApi';

	let pagination = {
		pageSize: 12,
		page: 1
	};
	let sid;
	user.subscribe((value) => {
		sid = value.sid;
	});

	let records = [];
	onMount(async () => {
		queryJudgeRecordsApi(sid).then((res) => {
			records = res.data;
			console.log(records);
		});
	});
</script>

<div class="flex flex-col items-center justify-center">
	<h1>History</h1>
	<div class="w-3/4 mt-8">
		<DataTable
			size="short"
			sortable
			title="提交记录"
			description="如有问题，联系助教~"
			pageSize={pagination.pageSize}
			page={pagination.page}
			headers={[
				// { key: "id", value:"ID"},
				{ key: 'pid', value: '题目ID' },
				{ key: 'pass_num', value: '通过数' },
				{ key: 'tot_num', value: '测试样例数' },
				{ key: 'language', value: '语言' },
				{
					key: 'commit_time',
					value: '提交时间',
					display: (time) => timeConverter(time),
					sort: (a, b) => a - b
				}
			]}
			rows={records}
		/>
		<Pagination
			bind:pageSize={pagination.pageSize}
			bind:page={pagination.page}
			totalItems={records.length}
			pageSizeInputDisabled
		/>
	</div>
</div>
