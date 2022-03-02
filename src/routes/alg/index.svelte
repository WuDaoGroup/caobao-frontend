
<script>
    import { goto } from '$app/navigation';
    let problemList = [
        {
            problem: "Assignment01",
            time: "20220301"
        },
        {
            problem: "Assignment02",
            time: "20220302"
        }]
    function handleClickProblem(addr){
        goto('/alg/' + addr);

    }
</script>

<h1>算法页</h1>

{#each problemList as problem}
    <div>
        <h2>{problem.problem}</h2>
        <p>发布时间: {problem.time}</p>
    </div>
    <button class="btn btn-outline btn-sm mt-2" on:click={()=>goto('alg/'+problem.problem)}>查看</button>
    <div class="divider"></div> 
{/each}