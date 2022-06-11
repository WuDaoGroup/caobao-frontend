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
        // console.log(sid, password)
        if (!sid){
            toast.push('请输入学号');
            return;
        }
        else if (!password){
            toast.push('请输入密码');
            return;
        }
		queryScoreApi(sid, password, course).then((response) => {
			if (response.status == 200) {
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


    let videoList = ["//player.bilibili.com/player.html?aid=214845537&bvid=BV1xa411L74g&cid=740192099&page=1","//player.bilibili.com/player.html?aid=299649085&bvid=BV1WF411G7jC&cid=737009412&page=1", "//player.bilibili.com/player.html?aid=684491870&bvid=BV1HU4y1y7bD&cid=732256892&page=1", "//player.bilibili.com/player.html?aid=511935969&bvid=BV1Cg411o7an&cid=731821220&page=1"]
    let rand = Math.random()*videoList.length | 0;
    let pickedVideo = videoList[rand]

    function dateState() {
        let date = new Date();
        if (date.getHours() >= 6 && date.getHours() < 12) {
            return "嗯……早起身体好，晚睡人会飘。"
        } else if (date.getHours() >= 12 && date.getHours() < 18) {
            return "哟！中午好呀，吃了吗？"
        } else {
            return "嘻嘻，月亮出来喽~咱也出门吧。"
        }
    }

    let say = dateState()

</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>成绩查询</title>
</svelte:head>

<div class="flex justify-between items-center">
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
    
    <div class="stats shadow">
      
        <div class="stat">
          <div class="stat-title">{course} 总分</div>
          <div class="stat-value">{totalScore}</div>
          <div class="stat-desc">如有疑问请联系助教</div>
        </div>
        
    </div>
</div>

<div class="divider"/>

{#if status == 'oop'}

<div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          {#each headers as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each headers as header}
            <th>{result[header]}</th>
        {/each}
      </tbody>
    </table>
</div>

<div class="hero">
    <div class="hero-content flex-col lg:flex-row">
      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202103%2F31%2F20210331002431_ec1bd.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657530577&t=9a4e64bd350d0a8a33757f300531d2de" class="max-w-sm rounded-lg shadow-2xl mr-8" alt="胡桃"/>
      <div>
        <h1 class="text-5xl font-bold underline decoration-sky-500/30 decoration-4">{say}</h1>

        <div class="flex flex-row justify-center items-center">
            <iframe src={pickedVideo} scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" title="胡桃" class="rounded-lg mt-4 w-[50rem] h-[30rem]"> </iframe>
        </div>
        
      </div>
    </div>
</div>


{/if}
