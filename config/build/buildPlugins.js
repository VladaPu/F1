import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function buildPlugins({ paths, isDev }) {
	return [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
			'process.env': {
				OW_API_KEY: JSON.stringify('f5d2d80eff349ead94bf4fa054dbef9c'),
				OW_API_URL_CURRENT: JSON.stringify(
					'https://api.openweathermap.org/data/2.5/weather'
				),
				OW_API_URL_FORECAST: JSON.stringify(
					'https://api.openweathermap.org/data/2.5/forecast'
				),
				IP_API_KEY: JSON.stringify('at_gSIkQ7gfKK96Cplp9RsWHkCnS5WaQ'),
				IP_API_URL: JSON.stringify('https://geo.ipify.org/api/v2/country,city'),
			},
		}),
		new webpack.EnvironmentPlugin({ ...process.env }),
		new webpack.HotModuleReplacementPlugin(),
	];
}
