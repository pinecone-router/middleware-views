/**
 * This will replace the content fetched from `path` into `selector`.
 * The content is assumed to not be an entire html page but a chunk of it.
 * @param {string} content the html content.
 * @param {string} selector the selector of where to put the content.
 */
export function renderContent(content, selector) {
	// replace the content of the selector with the fetched content
	document.querySelector(selector).innerHTML = content;
}
