import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function buildLoaders({ isDev }) {
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const babelLoader = {
		test: /\.(m?js|jsx)$/,
		exclude: /node_modules/,
		resolve: {
			fullySpecified: false,
		},
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env', '@babel/preset-react'],
			},
		},
	};

	const fileLoader = {
		test: /\.(png|jpe?g|gif)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath) => Boolean(resPath.includes('.module.')),
						localIdentName: isDev
							? '[path][name]__[local]--[hash:base64:8]'
							: '[hash:base64:8]',
					},
				},
			},
			'sass-loader',
		],
	};

	return [fileLoader, svgLoader, babelLoader, cssLoader];
}
