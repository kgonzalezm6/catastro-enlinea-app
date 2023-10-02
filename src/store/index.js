import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Modules
import registro from './registro/index'
import admin from './admin/index'
import login from './login/index'
import login_client from './login_client/index'
import perfil_contribuyente from './perfil_contribuyente/index'
import validacion from './validacion'
import config_contribuyente from './config_contribuyente'

export default new Vuex.Store({

	modules: {
		registro: registro,
		admin: admin,
		login: login,
		login_client: login_client,
		perfil_contribuyente: perfil_contribuyente,
		validacion: validacion,
		config_contribuyente: config_contribuyente
	},
	
})
