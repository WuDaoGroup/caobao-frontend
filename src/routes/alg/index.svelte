
<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { queryProblemsApi } from '../../api/problemApi';

    let problemList = []
    
	onMount(async () => {
        queryProblemsApi('alg').then(res => {
            problemList = res.data
            console.log(problemList)
        })
	});

</script>

<h1>算法页</h1>

{#each problemList as problem}
    <div>
        <h2>{problem.title}</h2>
        <p>{problem.description}</p>
    </div>
    <button class="btn btn-outline btn-sm mt-2" on:click={()=>goto('alg/'+problem.address)}>查看</button>
    <div class="divider"></div> 
{/each}