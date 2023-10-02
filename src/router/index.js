import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registro from '../views/Registro'
import LoginAdmin from '../views/LoginAdmin'
import Home from '../views/Home'
import Solicitudes from '../views/Admin'
import ProductosCatastrales from '../views/ProductosCatastrales'
import CedulaCatastral from '../views/CedulaCatastral'
import ValorUnitario from '../views/ValorUnitario'
import Requerimiento from '../views/Requerimiento'
import EstadoCuenta from '../views/EstadoCuenta'
import ValidarDocumento from '../views/ValidarDocumento'
import Configuracion from '../views/Configuracion'
import Perfil from '@/components/Config/Perfil'
import Matriculas from '@/components/Config/Matriculas'
import Roles from '@/components/Config/Roles'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/registro/:email?',
		name: 'registro',
		component: Registro
	},
	{
		path: '/validar_documento',
		name: 'validar_documento',
		component: ValidarDocumento
	},
	{
		path: '/admin',
		name: 'admin',
		component: LoginAdmin
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: [
			{
				path: '/home/solicitudes_pendientes',
				name: 'solicitudes_pendientes',
				component: Solicitudes,
			}
		]
	},
	{
		path: '/productos_catastrales',
		name: 'productos_catastrales',
		component: ProductosCatastrales,
		children: [
			{
				path: '/productos_catastrales/cedula_catastral',
				name: 'cedula_catastral',
				component: CedulaCatastral,
			},
			{
				path: '/productos_catastrales/requerimiento_pago',
				name: 'requerimiento_pago',
				component: Requerimiento,
			},
			{
				path: '/productos_catastrales/estado_cuenta',
				name: 'estado_cuenta',
				component: EstadoCuenta,
			},
			{
				path: '/productos_catastrales/valor_unitario',
				name: 'valor_unitario',
				component: ValorUnitario,
			},
			{
				path: '/productos_catastrales/configuracion',
				name: 'configuracion',
				component: Configuracion,
				children: [
					{
						path: '/productos_catastrales/configuracion/mi_perfil',
						name: 'mi_perfil',
						component: Perfil,
					},
					{
						path: '/productos_catastrales/configuracion/matriculas',
						name: 'matriculas',
						component: Matriculas,
					},
					{
						path: '/productos_catastrales/configuracion/roles',
						name: 'roles',
						component: Roles,
					}
				]
			}
		]
	}
]

const router = new VueRouter({
  routes
})

export default router
