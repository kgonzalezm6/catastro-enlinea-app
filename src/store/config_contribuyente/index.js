import request from '@/functions/request'

import Swal from 'sweetalert2'

const namespaced = true 

const state = {
    perfil: {},
    matriculas: [],
    roles: [],
    roles_faltantes: [],
    loading: false,
    campos_especiales: []
}

const mutations = {

    set_perfil(state, payload){
        state.perfil = payload
    },
    set_matriculas(state, payload){
        state.matriculas = payload
    },
    set_roles(state, payload){
        state.roles = payload.roles
        state.roles_faltantes = payload.roles_faltantes
    },
    set_loading(state, payload){
        state.loading = payload
    },
    set_campos_especiales(state, payload){
        state.campos_especiales = payload
    }

}

const actions = {

    fetch_profile({commit}){

        const user = JSON.parse(localStorage.getItem('catastro_user'))

        const data = {
            url: 'datos_personales',
            data: {
                id: user.id
            }
        }

        request.post(data)
        .then((response) => {
            console.log(response.data)
            commit('set_perfil', response.data)
        })

    },
    update_profile({state, commit}){

        commit('set_loading', true)

        const data = {
            url: 'actualizar_perfil', 
            data: state.perfil
        }

        request.post(data)
        .then(() => {
            Swal.fire({
                title: "Excelente!",
                html: "La información del perfil ha sido actualizada exitosamente.",
                icon: 'success',
            })
            .then(() => {
                commit('set_loading', false)
            })
        })

    },
    fetch_matriculas({commit}){

        const user = JSON.parse(localStorage.getItem('catastro_user'))

        const data = {
            url: 'matriculas_registradas',
            data: {
                id: user.id
            }
        }

        request.post(data)
        .then((response) => {
            commit('set_matriculas', response.data)
        })

    },
    fetch_roles({commit}){

        const user = JSON.parse(localStorage.getItem('catastro_user'))

        const data = {
            url: 'roles_registrados',
            data: {
                usuario_id: user.id
            }
        }

        request.post(data)
        .then((response) => {
            commit('set_roles', response.data)
        })

    },
    async solicitar_matricula({commit, dispatch}, payload){

        commit('set_loading', true)

        const user = JSON.parse(localStorage.getItem('catastro_user'))

        const data = {
            url: 'ingresar_solicitud',
            data: {
                usuario_id: user.id,
                matricula: payload
            }
        }

        await request.post(data)
        .then(() => {

            Swal.fire({
                title: "Excelente!",
                html: "La solicitud para el registro de una nueva matricula ha sido enviada exitosamente.",
                icon: 'success',
            })
            .then(() => {
                commit('set_loading', false)
                dispatch('fetch_matriculas')
            })

        })
    },
    async solicitar_rol({commit, dispatch}, payload){

        commit('set_loading', true)

        const user = JSON.parse(localStorage.getItem('catastro_user'))

        const data = {
            url: 'ingresar_solicitud_rol',
            data: {
                usuario_id: user.id,
                rol: payload
            }
        }

        await request.post(data)
        .then(() => {
            
            Swal.fire({
                title: "Excelente!",
                html: "La solicitud para el registro de una nueva matricula ha sido enviada exitosamente.",
                icon: 'success',
            })
            .then(() => {
                commit('set_loading', false)
                dispatch('fetch_roles')
            })
        })

    },
    fetch_campos_especiales({commit}, payload){

        const data = {
            url: 'obtener_campos_especiales',
            data: {
                tipo_usuario: payload
            }
        }

        request.post(data)
        .then((response) => {
            commit('set_campos_especiales', response.data)
        })

    }

}

const getters = {}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}