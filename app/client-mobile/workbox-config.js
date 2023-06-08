module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,js,ico,html,png,css,txt,svg}'
	],
	swDest: 'build/sw.js',
    swSrc: 'src/service-worker.js',
	dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
  maximumFileSizeToCacheInBytes: 5242880,
};