// bundle-entry.js
// Minimal bootstrap used only for bundling so runtime shims are present.
// This defines a minimal global.File to satisfy libs that expect the Web API.
if (typeof globalThis.File === 'undefined') {
	globalThis.File = class File {
		constructor() {}
	};
}

// Load the transpiled application entry. No logic changed.
require('./dist/index.js');
