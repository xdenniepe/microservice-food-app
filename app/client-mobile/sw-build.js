const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,js,ico,html,png,css,txt,svg}'
	],
	swDest: 'build/service-worker.js',
  swSrc: 'src/service-worker.js',
	dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
    maximumFileSizeToCacheInBytes: 5242880,
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
}
buildSW();