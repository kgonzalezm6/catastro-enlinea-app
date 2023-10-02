<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-alert
                        icon="mdi-shield-lock-outline"
                        prominent
                        text
                        type="info"
                        v-if="solicitud.tipo_solicitud_id == 1"
                    >
                        <v-row>
                            <v-col>
                                <div class="text-h6">
                                    Solicitud para Habilitación de Usuario
                                </div>
                                Para procesar la solicitud es necesario que acepte o bien rechace las <span class="font-weight-bold">matriculas</span> y <span class="font-weight-bold">roles</span> requeridos.  Luego dar clic en <v-chip color="success" label small>ACEPTAR</v-chip> o <v-chip label small color="error">RECHAZAR</v-chip>
                            </v-col>
                            <v-col align-self="center">
                                <v-row align="center">
                                    <v-col align="center">
                                        <v-btn class="elevation-0" @click="cambiar_estado_solicitud('A')" x-large color="success">
                                            ACEPTAR 
                                            <v-icon>
                                                mdi-check
                                            </v-icon>
                                        </v-btn>
                                        <v-btn @click="cambiar_estado_solicitud('R')" class="ml-2 elevation-0" x-large color="error">
                                            RECHAZAR 
                                            <v-icon>
                                                mdi-close-circle
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="6">
                    <DetalleUsuario></DetalleUsuario>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12">
                            <Matriculas></Matriculas>
                        </v-col>
                        <v-col cols="12">
                            <Roles></Roles>
                        </v-col>
                        <v-col cols="12">
                            <Historial></Historial>
                        </v-col>
                        
                    </v-row>
                </v-col>
            </v-row>

            <Modal ref="modal" title="Confirmar" width="500" :dark="false" :toolbar="false">

                <template #form>

                    <v-container>
                        <v-form ref="form" v-model="valid" @submit.prevent="procesar_solicitud()">
                            <v-row class="text-center mt-2" justify="center">
                                <v-col cols="3">
                                    <v-img :src="require('@/assets/img/question.png')"></v-img>
                                </v-col>
                                <v-col cols="12">
                                    <span class="text-h4">¿Está seguro?</span>
                                </v-col>
                                <v-col cols="12">
                                    <span class="text-h5">Está a punto de <v-chip :color="estado == 'R' ? 'error' : 'success'" label>{{ estado == 'R' ? 'RECHAZAR' : 'ACEPTAR' }}</v-chip> la solicitud.</span>
                                </v-col>
                            </v-row>
                            <v-row v-if="estado == 'R'" class="text-center" aling="center" justify="center">  
                                <v-col cols="6">
                                    <v-select v-model="motivo_rechazo" :rules="[v => !!v]" :items="motivos" item-text="nombre" item-value="id" label="Tipo de Rechazo" outlined></v-select>
                                </v-col>
                            </v-row>

                            <v-divider></v-divider>

                            <v-row class="text-center">
                                <v-col>
                                    <v-btn :disabled="loading" @click="closeModal()" large class="elevation-0">Cancelar</v-btn>
                                    <v-btn :disabled="loading" :loading="loading" type="submit" large class="ml-2 elevation-0" color="primary">Confirmar</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </template>
            </Modal>
        </v-container>
    </div>
</template>

<script>

    import DetalleUsuario from '@/components/Admin/DetalleUsuario.vue'
    import Matriculas from '@/components/Admin/Matriculas.vue'
    import Historial from '@/components/Admin/Historial.vue'
    import Roles from '@/components/Admin/Roles.vue'

    //import Swal from 'sweetalert2'

    import Modal from '@/components/Modal'
    import { mapActions, mapState } from 'vuex'

    export default {
        data(){
            return{
                estado: null,
                valid: true,
                motivo_rechazo: null,
                loading: false
            }
        },
        components: {
            DetalleUsuario,
            Matriculas,
            Historial,
            Modal,
            Roles
        },
        methods: {
            ...mapActions([
                'getMotivosRechazo'
            ]),
            closeModal(){
                this.$refs.modal.close()
            },
            cambiar_estado_solicitud(estado){

                this.estado = estado
                this.getMotivosRechazo()

                this.$refs.modal.show()

            },
            procesar_solicitud(){

                this.$refs.form.validate()

                if (this.valid) {
                    
                    this.loading = true

                    const data = {
                        estado: this.estado,
                        motivo_rechazo: this.motivo_rechazo
                    }

                    this.$store.dispatch('cambiar_estado_solicitud', data)
                    .then((result) => {
                        
                        console.log(result)

                        if (result) {
                            this.motivo_rechazo = null
                            this.valid = true
                            this.$refs.form.resetValidation()
                            this.loading = false
                            this.$refs.modal.close()    
                        }

                    })

                }
            }

        },
        computed: {

            id_solicitud(){

                return this.$store.getters.getIdSolicitud

            },
            allAcepted(){

                const data = this.$store.getters.getDetalleSolicitud

                let matriculas = data.matriculas

                if(matriculas){

                    const aceptadas = matriculas.filter(matricula => matricula.estado == 'A')

                    if(aceptadas.length == matriculas.length  && matriculas.length > 0){

                        return true

                    }

                }

                return false

            },
            allRejected(){

                const data = this.$store.getters.getDetalleSolicitud

                let matriculas = data.matriculas

                if(matriculas){

                    const rechazadas = matriculas.filter(matricula => matricula.estado == 'R')

                    if(rechazadas.length == matriculas.length && matriculas.length > 0){

                        return true

                    }

                }

                return false

            },
            motivos(){
                return this.$store.getters.getMotivos
            },
            ...mapState({
                solicitud: state => state.admin.detalle_solicitud.solicitud
            })

        }
    }
</script>

<style>

</style>