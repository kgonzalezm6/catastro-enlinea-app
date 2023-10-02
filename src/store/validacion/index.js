import request from '@/functions/request'

const namespaced = true

const state = {
    servicios: [],
    loading: false,
    message: null,
    type: null,
    url: null
}

const mutations = {

    set_servicios(state, payload){
        state.servicios = payload
    },
    set_loading(state, payload){
        state.loading = payload
    },
    set_message(state, payload){
        state.message = payload.message
        state.type = payload.type
    },
    set_url(state, payload){
        state.url = payload
    },
    clear_data(state){
        state.message = null
        state.type = null
        state.url = null
    }

}

const actions = {

    validar_documento({commit}, payload){
        
        commit('set_loading', true)

        const data = {
            url: 'validar_documento',
            data: payload
        }

        request.post(data)
        .then((response) => {

            if (response.data.status == 200) {
                commit('set_url', 'https://' + response.data.file_path)
            }else{
                commit('set_url', null)
            }

            commit('set_message', response.data)
            commit('set_loading', false)
        })

    },
    servicios_disponibles({commit}){

        const data = {
            url: 'servicios_validacion',
            data: {}
        }

        request.post(data)
        .then((response) => {
            commit('set_servicios', response.data)
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