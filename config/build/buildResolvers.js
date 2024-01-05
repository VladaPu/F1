export default function buildResolvers({ paths }) {
	return {
		extensions: ['.jsx', '.js'],
		preferAbsolute: true,
		modules: [paths.src, 'node_modules'],
		mainFiles: ['index'],
		alias: {},
	};
}
