const { postcss } = require('./src/config/pxtorem')
module.exports = {
    outputDir:"dist",
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },
    lintOnSave: false,
    devServer: {
        proxy: {
            '/lis_alarm': {
                // target: 'https://lisalarm.coyotebio-lab.com',
                target: 'https://scldev.coyotebio-lab.com:8443',
                changeOrigin: true,
                pathRewrite:{
                    '^/lis_alarm': '/lis_alarm'
                }
            },
        }
    }
}