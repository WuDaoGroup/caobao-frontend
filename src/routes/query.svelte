<script>
	let sid;
	let password;
    let course;
    $: console.log(sid, password, course)
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
            <option>OOP</option>
            <option>算法</option>
          </select>
          <button class="btn">查询</button>
        </div>
    </div>
</div>

