module.exports = {
	transpileDependencies: [
		'vuetify'
	],
	devServer: {
			host: 'localhost'
		},
	publicPath: process.env.NODE_ENV === 'production' ? '/apps/catastro-enlinea-app/' : '/',
		pwa: {
			workboxOptions: {
			skipWaiting: true
			}
		},
}
