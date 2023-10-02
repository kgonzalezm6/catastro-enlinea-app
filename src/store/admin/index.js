import request from '@/functions/request'
import Swal from 'sweetalert2'

const state = {
    id_solicitud: null,
    solicitudes: [],
    headers_solicitudes: [],
    detalle_solicitud: {
        matriculas: [],
        historial: [],
        roles: []
    },
    enable_edit: false,
    bk_detalle_solicitud: null,
    text_snack: null,
    snackbar: false,
    search: null,
    adjuntos_solicitud: [],
    aceptadas: null,
    rechazadas: null,
    enproceso: null,
    estado: null,
    tecnicos: [],
    motivos_rechazo: [],
    uploading: false,
    files: []
}

const mutations = {

    setSolicitudes(state, payload){

        state.solicitudes = payload

    },
    setIdSolicitud(state, payload){
        state.id_solicitud = payload

        if (state.id_solicitud) {
            
            this.dispatch('detalleSolicitud')

        }
    },
    setDetalleSolicitud(state, payload){

        state.detalle_solicitud = payload

    },
    setEnableEdit(state){

        state.enable_edit = !state.enable_edit

    },
    setBkDetalleSolicitud(state, payload){

        state.bk_detalle_solicitud = payload

    },
    setTxtSnack(state, payload){
        state.text_snack = payload
    },
    setSearch(state, payload){
        state.search = payload
    },
    setAdjuntosSolicitud(state, payload){
        state.adjuntos_solicitud = payload
    },
    setAceptadas(state, payload){
        state.aceptadas = payload
    },
    setRechazadas(state, payload){
        state.rechazadas = payload
    },
    setEnProceso(state, payload){
        state.enproceso = payload
    },  
    setEstado(state, payload){
        state.estado = payload
    },
    setTecnicos(state, payload){
        state.tecnicos = payload
    },
    setMotivosRechazo(state, payload){
        state.motivos_rechazo = payload
    },
    setUploading(state, payload){
        state.uploading = payload
    }

}

const actions = {

    getSolicitudes({commit, state}){

        const usuario = JSON.parse(localStorage.getItem('app-catastro-enlinea'))

        const data = {
            url: 'obtener_solicitudes',
            data: {
                estado: state.estado,
                nit: usuario.nit
            }
        }

        request.post(data)
        .then((response) => {

            this.commit('setSolicitudes', response.data)
            commit('setAceptadas', response.data.aceptadas)
            commit('setRechazadas', response.data.rechazadas)
            commit('setEnProceso', response.data.enproceso)

        })

    },
    detalleSolicitud(){

        const data = {
            url: 'detalle_solicitud',
            data: {
                id: this.getters.getIdSolicitud
            }
        }

        request.post(data)
        .then((response) => {

            this.commit('setDetalleSolicitud', response.data)

        })

    },
    cambiar_estado_matricula({dispatch}, payload){

        const usuario = JSON.parse(localStorage.getItem('app-catastro-enlinea'))
        
        payload.nit = usuario.nit

        const data = {
            url: 'cambiar_estado_matricula',
            data: payload
        }

        request.post(data)
        .then(() => {

            dispatch('detalleSolicitud')
            dispatch('getSolicitudes')

        })

    },
    async cambiar_estado_solicitud({dispatch}, payload){

        const usuario = JSON.parse(localStorage.getItem('app-catastro-enlinea'))
        
        const data = {
            url: 'cambiar_estado_solicitud',
            data: {
                id: this.getters.getIdSolicitud,
                estado: payload.estado,
                nit: usuario.nit,
                motivo_rechazo: payload.motivo_rechazo
            }
        }

        const result = await request.post(data)

        const result_alert = await Swal.fire({
                                title: result.data.title,
                                html: result.data.message,
                                icon: result.data.icon,
                            })
        
        dispatch('getSolicitudes')
        dispatch('detalleSolicitud')
        
        return result_alert.isConfirmed

    },
    // eslint-disable-next-line no-unused-vars
    change_edit(state, payload){

        if (!this.getters.getEnableEdit) {
            
            // Activar la edición y guardar bk

            this.commit('setEnableEdit')
            this.commit('setTxtSnack', 'Edición Activada')
            this.commit('setBkDetalleSolicitud', JSON.stringify(this.getters.getDetalleSolicitud))

        }else{

            const usuario = JSON.parse(localStorage.getItem('app-catastro-enlinea'))
        
            const data = {
                url: 'actualizar_detalle_usuario',
                data: {
                    data: this.getters.getDetalleSolicitud,
                    nit: usuario.nit
                }
            }
    
            request.post(data)
            .then((response) => {
    
                if (response.data) {
                    
                    this.commit('setEnableEdit')
                    this.commit('setTxtSnack', 'Información Actualizada')
                    this.dispatch('detalleSolicitud')

                }
    
            })

        }

    },
    cancel_change(){

        this.commit('setEnableEdit')

        this.commit('setDetalleSolicitud', JSON.parse(this.getters.getBkSolicitud))

    },
    obtener_adjuntos({state, commit}){

        const data = {
            url: 'obtener_adjuntos',
            data: {
                solicitud_id: state.id_solicitud
            }
        }

        request.post(data)
        .then((response) => {
            commit('setAdjuntosSolicitud', response.data)
        })
        
    },
    enviar_email({state, dispatch}, payload){

        const usuario = JSON.parse(localStorage.getItem('app-catastro-enlinea'))
                
        const data = {
            url: 'enviar_email', 
            data: {
                solicitud_id: state.id_solicitud,
                asunto: payload.asunto,
                mensaje: payload.mensaje,
                nit: usuario.nit
            }
        }

        request.post(data)
        .then((response) => {

            Swal.fire({
                title: response.data.title,
                html: response.data.message,
                icon: response.data.icon,
            })
            .then(() => {
                dispatch('detalleSolicitud')
            })

        })

    },
    obtener_tecnicos({commit}, payload){

        const data = {
            url: 'obtener_tecnicos',
            data: {
                nit: payload
            }
        }

        request.post(data)
        .then((response) => {
            commit('setTecnicos', response.data)
        })

    },
    asignar_tecnico({state, dispatch}, payload){

        const data = {
            url: 'asignar_tecnico', 
            data: {
                tecnico: payload,
                solicitud_id: state.id_solicitud
            }
        }

        request.post(data)
        .then((response) => {
            

            Swal.fire({
                title: response.data.title,
                html: response.data.message,
                icon: response.data.icon,
            })
            .then(() => {
                dispatch('getSolicitudes')
            })

        })

    },
    registrar_comentario({state, dispatch}, payload){

        const usuario = JSON.parse(localStorage.getItem('app-catastro-enlinea'))

        const data = {
            url: 'registrar_comentario',
            data: {
                solicitud_id: state.id_solicitud,
                nit: usuario.nit,
                comentario: payload
            }
        }

        request.post(data)
        .then(() => {
            dispatch('detalleSolicitud')
        })

    },
    getMotivosRechazo({commit}){

        const data = {
            url: 'motivos_rechazo',
            data: null
        }

        request.post(data)
        .then((response) => {
            commit('setMotivosRechazo', response.data)
        })
    },
    subirArchivos({commit, state, dispatch}, payload){

        commit('setUploading', true)

        payload.forEach(file => {
            
            let formData = new FormData();

            formData.append('file', file)
            formData.append('solicitud_id', state.id_solicitud)

            const data = {
                url: 'upload_file_registro',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }            

            request.post(data)
            .then((response) => {
                if(response.data.status == 200){
                    dispatch('obtener_adjuntos')
                }
            })

        });

        commit('setUploading', false)

    },
    async cambiar_estado_rol({dispatch}, payload){

        const usuario = JSON.parse(localStorage.getItem('app-catastro-enlinea'))

        const data = {
            url: 'cambiar_estado_rol',
            data: {
                estado: payload.estado,
                solicitud_id: payload.item.solicitud_id,
                usuario_id: payload.item.usuario_id,
                usuario_atiende: usuario.nit
            }
        }

        request.post(data)
        .then(() => {
            dispatch('detalleSolicitud')
            dispatch('getSolicitudes')
        })
    }

}

const getters = {
    getCurrentSolicitud: state => state.current_solicitud,
    getSolicitudes: state => state.solicitudes,
    getIdSolicitud: state => state.id_solicitud,
    getDetalleSolicitud: state => state.detalle_solicitud,
    getEnableEdit: state => state.enable_edit,
    getTxtSnack: state => state.text_snack,
    getBkSolicitud: state => state.bk_detalle_solicitud,
    getSearch: state => state.search,
    getAdjuntos: state => state.adjuntos_solicitud,
    getAceptadas: state => state.aceptadas,
    getRechazadas: state => state.rechazadas,
    getEnProceso: state => state.enproceso,
    getEstado: state => state.estado,
    getTecnicos: state => state.tecnicos,
    getMotivos: state => state.motivos_rechazo,
}

export default {
    state,
    mutations,
    actions, 
    getters
}