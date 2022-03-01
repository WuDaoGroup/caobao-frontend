
<script>
    import { goto } from '$app/navigation';
    let questionList = [
        {
            question: "Assignment01",
            time: "20220301"
        },
        {
            question: "Assignment02",
            time: "20220302"
        }]
    function handleClickQuestion(addr){
        goto('/alg/' + addr);

    }
</script>

<h1>算法页</h1>

{#each questionList as question}
    <div>
        <h2>{question.question}</h2>
        <p>发布时间: {question.time}</p>
    </div>
    <button class="btn btn-outline btn-sm mt-2" on:click={()=>goto('alg/'+question.question)}>查看</button>
    <div class="divider"></div> 
{/each}