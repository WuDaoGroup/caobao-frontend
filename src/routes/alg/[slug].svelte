<script context="module">
    import {markdown} from 'markdown';
	export const prerender = true;
	export async function load({ fetch, params }) {
		let question, questionHtml;
		try {
			// here we are gonna fetch the single article by id
			question = await fetch(`http://localhost:8059/static/alg/${params.slug}.md`);
            question = await question.text()
            questionHtml = markdown.toHTML(question)
		} catch (e) {
			console.log(e);
		}
		return {
			props: {
                questionHtml,
				slug: params.slug
			}
		};
	}
</script>

<script>
    export let questionHtml;
</script>

{@html questionHtml}

