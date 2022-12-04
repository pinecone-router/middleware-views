build({
	entryPoints: [`src/index.ts`],
	outfile: `dist/views.min.js`,
	platform: 'browser',
	define: { CDN: true },
	sourcemap: 'inline',
})

function build(options) {
	options.define || (options.define = {})

	return require('esbuild')
		.build({ ...options, minify: true, bundle: true, sourcemap: true })
		.catch(() => process.exit(1))
}
