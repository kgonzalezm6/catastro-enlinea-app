<template>
    <div>
        <v-card color="blue-grey lighten-5" outlined min-height="850">
            <v-card-text v-if="data">
                <v-row align="center">
                    <v-col cols="5">
                        <span class="overline">Datos del Usuario</span>
                    </v-col>
                    <v-col align="end">
                        <v-badge :content="data.adjuntos" overlap :color="data.adjuntos > 0 ? 'error' : null">
                            <v-btn @click="() => {  

                                obtener_adjuntos()

                                const data = {
                                    template: 'FormAdjuntos',
                                    title: 'Documentos adjuntos',
                                    width: '500'
                                }

                                mostrar_modal(data)

                            }" icon>
                                <v-icon>mdi-paperclip</v-icon>
                            </v-btn>
                        </v-badge>

                        <v-btn @click="() => {  

                            const data = {
                                template: 'FormEmail',
                                title: 'Enviar correo',
                                width: '800'
                            }

                            mostrar_modal(data)

                        }" class="ml-4" icon>
                            <v-icon>mdi-email</v-icon>
                        </v-btn>
                        
                    </v-col>
                </v-row>

            </v-card-text>
            <v-card-text v-if="data" class="mt-0 pt-0">

                <v-row class="mb-1 mt-1">
                    <v-col cols="12">
                        <v-text-field :disabled="!enable_edit" v-model="data.nombres" autocomplete="off" hide-details outlined label="Nombres"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.apellidos" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Apellidos"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="data.sexo" :disabled="!enable_edit" :items="sexo" autocomplete="off" hide-details outlined label="Sexo"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="data.telefono" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Teléfono"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.direccion" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Dirección"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.email" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Correo Electrónico"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.dpi" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="DPI"></v-text-field>
                    </v-col>

                     <v-col cols="12">
                        <v-text-field v-model="data.representacion_legal" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Representación Legal"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.carne_abogado" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Carné de Abogado"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.carne_valuador" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Carné de Valuador"></v-text-field>
                    </v-col>

                </v-row>

                <!-- Modificar la información del usuario -->
                <v-row class="mt-0 pt-0">
                    <v-col cols="12">
                        <v-btn @click="change_edit()" :color="!enable_edit ? 'primary' : 'success'" class="elevation-0">
                            {{ !enable_edit ? 'Editar' : 'Guardar' }}
                            <v-icon class="ml-2" size="20">
                                {{ !enable_edit ? 'mdi-pencil' : 'mdi-content-save' }}
                            </v-icon>
                        </v-btn>

                        <v-btn @click="cancel()" v-if="enable_edit" color="secondary" class="ml-1"> Cancelar
                            <v-icon>
                                mdi-close-circle
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-snackbar :timeout="1000" bottom v-model="snackbar">
            {{ txt_nack }}

            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar = false">
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </template>
        </v-snackbar>

        <Modal :width="width" :title="title" :dark="false" ref="modal">
            <template #form>
                <component @closeModal="closeModal()" v-bind:is="content"></component>
            </template>
        </Modal>
    </div>
</template>

<script>

    import Modal from '@/components/Modal'
    import { mapActions } from 'vuex'

    export default {
        
        components: {
            Modal,
            'FormAdjuntos': () => import('@/components/Admin/FormAdjuntos'),
            'FormEmail': () => import('@/components/Admin/FormEmail')
        },
        data(){
            return{

                title: null,
                width: null,
                content: null,
                sexo: [
                    {
                        text: 'Hombre',
                        value: 'H'
                    },
                    {
                        text: 'Mujer',
                        value: 'M'
                    }
                ],
                snackbar: false,
                text: 'Example'
            
            }
        },
        methods: {

            change_edit(){

                this.$store.dispatch('change_edit')

                this.snackbar = true

            },
            cancel(){

                this.$store.dispatch('cancel_change')

            },
            mostrar_modal(data){

                this.$refs.modal.show()
                this.content = data.template
                this.title = data.title
                this.width = data.width

            },
            ...mapActions([
                'obtener_adjuntos'
            ]),
            closeModal(){

                this.$refs.modal.close()

            }

        },
        computed: {
            data(){

                const detalle = this.$store.getters.getDetalleSolicitud

                return detalle.usuario

            },
            campos_especiales(){

                const detalle = this.$store.getters.getDetalleSolicitud

                return detalle.campos_especiales

            },
            enable_edit(){

                return this.$store.getters.getEnableEdit

            },
            txt_nack(){

                return this.$store.getters.getTxtSnack

            }
        }
    }
</script>

<style>

</style>