import request from '@/functions/request'

import router from '@/router'

const namespaced = true

const state = {

    loginError: false,
    loginMessage: null

}

const mutations = {

    setLoginStatus(state, payload){
        state.loginError = payload
    },
    setLoginMessage(state, payload){
        state.loginMessage = payload
    }

}

const actions = {

    doLogin({commit}, payload){

        const data = {
            url: 'login',
            data: payload
        }

        request.post(data)
        .then((response) => {

            if(response.data.status == 200){

                localStorage.setItem('app-catastro-enlinea', JSON.stringify(response.data.data))

                router.push('/home')

                return 

            }

            commit('setLoginStatus', true)
            commit('setLoginMessage', response.data.message)

        })

    },
    doLogout(){

        localStorage.removeItem('app-catastro-enlinea')

        router.push('/admin')

    }

}

export default {
    namespaced,
    state,
    mutations,
    actions
}