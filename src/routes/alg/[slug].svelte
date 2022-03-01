<script context="module">
	export const prerender = true;
	export async function load({ fetch, params }) {
		let question;
		try {
			// here we are gonna fetch the single article by id
			question = await fetch(`http://localhost:8059/static/alg/${params.slug}.md`);
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
	import SvelteMarkdown from 'svelte-markdown'
    export let question;
	const source = question;
</script>

<h1>题目</h1>

<SvelteMarkdown {source} />