import request from '@/functions/request'

import router from '@/router'

const namespaced = true

const state = {
    user: {
        email: null,
        password: null,
    },
    loading: false,
    error_msg: null
}

const mutations = {
    changeLoading(state, payload){
        state.loading = payload
    },
    setErrorMsg(state, payload){
        state.error_msg = payload
    },
    clearUser(state){
        state.user = {
            email: null,
            password: null
        }
    }
}

const actions = {

    doLogin({state, commit}){

        commit('changeLoading', true)

        const data = {
            url: 'public_login',
            data: state.user
        }

        request.post(data)
        .then((response) => {
            
            commit('changeLoading', false)

            if (response.data.status == 200) {

                commit('setErrorMsg', null)

                localStorage.setItem('catastro_user', JSON.stringify(response.data.data))

                router.push('/productos_catastrales')

                commit('clearUser')

                return 

            }

            commit('setErrorMsg', response.data.message)
            
        })

    },
    doLogout(){

        localStorage.removeItem('catastro_user')

        router.push('/')
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