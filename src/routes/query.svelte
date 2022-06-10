<script>
    import { queryScoreApi } from "../api/judgeApi";
    import { toast } from '@zerodevx/svelte-toast';
	let sid;
	let password;
    let course;
    // $: console.log(sid, password, course)
    let status = 'unavailable';
    $: totalScore = 0;
    let result;
    let headers = []
    

	function handleQuery() {
		queryScoreApi(sid, password, course).then((response) => {
            console.log(sid, password)
            if (sid==undefined){
                toast.push('请输入学号');
                return;
            }
            else if (password==undefined){
                toast.push('请输入密码');
                return;
            }
			else if (response.status == 200) {
				toast.push('成功查询');
				result = response.data.data
                status = 'oop'
                headers = Object.keys(result)
                // console.log(result)
                // console.log(Object.keys(result))
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

    console.log(result)
</script>


<div class="flex flex-wrap">
    <div class="form-control mx-4">
        <label class="input-group">
          <span>学号</span>
          <input type="text" placeholder="20370000" class="input input-bordered" bind:value={sid}/>
        </label>
    </div>
    
    <div class="form-control mx-4">
        <label class="input-group">
          <span>密码</span>
          <input type="password" placeholder="123456" class="input input-bordered" bind:value={password}/>
        </label>
    </div>

    <div class="form-control">
        <div class="input-group">
          <select class="select select-bordered" bind:value={course}>
            <option>oop</option>
            <option>alg</option>
          </select>
          <button class="btn" on:click={handleQuery}>查询</button>
        </div>
    </div>
</div>

<div class="divider"/>

{#if status == 'oop'}

<div class="stats shadow mb-4">
  
    <div class="stat">
      <div class="stat-title">OOP 总分</div>
      <div class="stat-value">{totalScore}</div>
      <div class="stat-desc">如有疑问请联系助教</div>
    </div>
    
</div>

<div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <!-- <th>考勤</th>
          <th>LAB</th>
          <th>CTS-1</th>
          <th>CTS-2</th>
          <th>CTS-3</th>
          <th>CTS-4</th>
          <th>组队作业</th>
          <th>专题写作</th>
          <th>编程大作业</th> -->
          {#each headers as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        {#each headers as header}
            <th>{result[header]}</th>
        {/each}
        <!-- <tr>
          <td>Cy Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
        </tr> -->

      </tbody>
    </table>
</div>
{:else if status == 'unavailable'}

<div class="stats shadow mb-4">
  
    <div class="stat">
      <div class="stat-value mb-2">等待查询</div>
      <div class="stat-desc">如有疑问请联系助教</div>
    </div>
    
</div>

{/if}
