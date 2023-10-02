import request from '@/functions/request'

import axios from 'axios'
import Swal from 'sweetalert2'

const namespaced = true

const state = {
    matriculas: [],
    matricula_select: null,
    pdf_url: null,
    trimestres: null,
    trimestre: null,
    emptyMessage: null,
    loading: false
}

const mutations = {
    setMatriculas(state, payload){
        state.matriculas = payload
    },
    setMatricula(state, payload){
        state.matricula_select = payload
    },
    setPDFURL(state, payload){
        state.pdf_url = payload
    },
    setTrimestres(state, payload){
        state.trimestres = payload
    },
    setTrimestre(state, payload){
        state.trimestre = payload
    },
    setEmptyMessage(state, payload){
        state.emptyMessage = payload
    },
    setLoading(state, payload){
        state.loading = payload
    }
}

const actions = {
    obtener_matriculas({commit}){

        const user = JSON.parse(localStorage.getItem('catastro_user'))

        const data = {
            url: 'matriculas_contribuyente',
            data: {
                id: user.id
            }
        }

        request.post(data)
        .then((response) => {
            commit('setMatriculas', response.data)
        })
    },
    obtener_cedula({commit, state}){
        
        commit('setLoading', true)
        const urlpeticion = process.env.VUE_APP_ACTUALIZACION_URL + '?matricula=' + state.matricula_select

        axios.get(urlpeticion)
        .then((response) => {

            if (response.data.actualizar == 'S'){
                Swal.fire({
                    title: response.data.title,
                    html: response.data.message,
                    icon: response.data.icon,
                })
            }

        })

        const user = JSON.parse(localStorage.getItem('catastro_user'))

        const url = process.env.VUE_APP_CEDULA_URL + '?matricula=' + state.matricula_select + '&user=' + user.id 

        axios.get(url, { responseType: "blob" })
        .then((response) => {
            
            const blob = new Blob([response.data], {type: 'application/pdf'});
            const objectUrl = URL.createObjectURL(blob);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cedula_catastral.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();

            commit('setPDFURL', objectUrl)

            commit('setLoading', false)
        })
    },
    obtener_requerimiento({state, commit}){

        commit('setEmptyMessage', null)
        commit('setLoading', true)

        const urlpeticion = process.env.VUE_APP_ACTUALIZACION_URL + '?matricula=' + state.matricula_select

        axios.get(urlpeticion)
        .then((response) => {

            if (response.data.actualizar == 'S'){
                Swal.fire({
                    title: response.data.title,
                    html: response.data.message,
                    icon: response.data.icon,
                })
            }

        })      
        const data = {
            url: 'matricula_interlocutor',
            data: {
                matricula: state.matricula_select
            }
        }

        request.post(data)
        .then((response) => {

            if (response.data.status == 200) {
                
                const url= 'https://udicat.muniguate.com/apis/api_requerimiento/'
                const data_r = {
                    name: 'generar_requerimiento',
                    param: {
                        interlocutor: response.data.interlocutor,
                        fecha: state.trimestre
                    }
                }

                axios.post(url, data_r, { responseType: "blob" })
                .then((response) => {

                    if (response.data.type == 'application/json') {
                        
                        commit('setEmptyMessage', 'No existe un requerimiento de pago para la matrícula seleccionada.')
                         
                    }else{

                        const blob = new Blob([response.data], {type: 'application/pdf'});
                        const objectUrl = URL.createObjectURL(blob);
                        commit('setPDFURL', objectUrl)

                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'requerimiento_pago.pdf'); //or any other extension
                        document.body.appendChild(link);
                        link.click();

                    }

                    commit('setLoading', false)
                    
                })

            }
        })

    },

    obtener_estado_cuenta({state,commit}){

        commit('setEmptyMessage', null)
        commit('setLoading', true)

        const urlpeticion = process.env.VUE_APP_ACTUALIZACION_URL + '?matricula=' + state.matricula_select

        axios.get(urlpeticion)
        .then((response) => {

            if (response.data.actualizar == 'S'){
                Swal.fire({
                    title: response.data.title,
                    html: response.data.message,
                    icon: response.data.icon,
                })
            }

        })

        const url = 'https://udicat.muniguate.com/apis/catastro-enlinea-api/public/estado_cuenta';
        const header = {
            responseType: 'blob',
            params:{
                matricula: state.matricula_select
            }
        }

        axios.get(url,header).then(response => {

            if (response.data.type == 'application/json') {      
                commit('setEmptyMessage', 'Error de matricula seleccionada.');
            }else{

                const blob = new Blob([response.data], {type: 'application/pdf'});
                const objectUrl = URL.createObjectURL(blob);

                commit('setPDFURL', objectUrl)

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'estado_cuenta.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();

            }

            commit('setLoading', false)
        
        })
        

    },
    
    obtener_trimestres({commit}){

        const url= 'https://udicat.muniguate.com/apis/api_requerimiento/'
        const data = {
            name: 'obtener_trimestres',
            param: {
                
            }
        }

        axios.post(url, data)
        .then((response) => {
            if (response.data.response.status == 200) {
                commit('setTrimestres', response.data.response.result.trimestres)
            }
        })

    },
    clearData({commit}){
        commit('setMatricula', null)
        commit('setPDFURL', null)
        commit('setTrimestre', null)
        commit('setEmptyMessage', null)
    }
}

const getters = {

}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}