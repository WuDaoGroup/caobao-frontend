<script>
    import { DataTable } from "carbon-components-svelte";
    import {timeConverter} from '../services/time.js';
    import { onMount } from 'svelte';
    import { user } from '../stores/userStore';
    import { queryJudgeRecordsApi} from '../api/judgeApi';

	let sid;
	user.subscribe((value) => {
		sid = value.sid;
	});

    let records = [];
    onMount(async () => {
        queryJudgeRecordsApi(sid).then(res => {
            records = res.data
            console.log(records)
        })
	});
</script>

<DataTable
  sortable
  title="提交记录"
  description="如有问题，联系助教~"
  headers={[
    // { key: "id", value:"ID"},
    { key: "pid", value: "题目ID" },
    { key:"pass_num", value: "通过数"},
    { key:"tot_num", value: "测试样例数"},
    { key:"language", value: "语言"},
    {
      key: "commit_time",
      value: "提交时间",
      display: (time) => timeConverter(time),
      sort: (a, b) => a - b,
    },
  ]}
  rows={records}
/>