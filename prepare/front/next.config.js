//const CompressPlugin = require('compression-webpack-plugin');
//Import the Bundle Analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
    compress: true,
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [...config.plugins];
        // if(prod) {
        //     plugins.push(new CompressPlugin());
        // }
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins,

        };
    },
});