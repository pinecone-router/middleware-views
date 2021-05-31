/**
 * This will replace the content fetched from `path` into `selector`.
 * The content is assumed to not be an entire html page but a chunk of it.
 */
export function renderContent(content: string, selector: string) {
	// replace the content of the selector with the fetched content
	document.querySelector(selector)!.innerHTML = content;
}
