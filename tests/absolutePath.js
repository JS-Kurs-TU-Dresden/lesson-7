export function getAbsolutePath(relativePath) {
	return new URL(relativePath, import.meta.url).pathname
}