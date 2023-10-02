<template>
    <div>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="table_data.headers"
                    :items="table_data.items"
                    :items-per-page="10"
                    class="elevation-0"
                    :search="busqueda"
                    hide-default-footer
                    @page-count="pageCount = $event"
                    :page.sync="page"
                >
                    <template v-slot:[`item.action`]="{ item }">
                        
                        <v-btn @click="asignar(item)" small v-if="usuario.jefe == '1'" icon color="info">
                            <v-icon>
                                mdi-account-arrow-left
                            </v-icon>
                        </v-btn>

                        <v-btn small icon color="success" @click="detalle(item)">
                            <v-icon>
                                mdi-eye
                            </v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:[`item.estado`]="{ item }">
                        <v-chip small label :color="item.color">
                           {{ item.estado }}
                        </v-chip>
                    </template>

                    <template v-slot:[`item.tipo_solicitud`]="{ item }">
                        <v-chip dark small label :color="item.color_tipo">
                           {{ item.tipo_solicitud }}
                        </v-chip>
                    </template>

                </v-data-table>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-pagination
                    v-model="page"
                    :length="pageCount"
                ></v-pagination>
            </v-col>
        </v-row>

        <Modal ref="modal" :dark="dark" :fullscreen="fullscreen" :title="title" :width="width">
            <template #form>

                <Form v-if="form == 'form'"></Form>

                <FormAsignaUsuario v-if="form == 'usuario'"></FormAsignaUsuario>

            </template>
        </Modal>

    </div>
</template>

<script>

    import Modal from '@/components/Modal'
    import Form from '@/components/Admin/Form'
    import FormAsignaUsuario from '@/components/Admin/FormAsignaUsuario'
    
    export default {
        components: {
            Modal,
            Form,
            FormAsignaUsuario
        },
        data(){
            return{
                search: null,
                title: null,
                width: null,
                fullscreen: false,
                form: null,
                dark: false,
                page: 1,
                pageCount: null
            }
        },
        methods: {

            obtener_solicitudes(){

                this.$store.dispatch('getSolicitudes')

            },
            detalle(item){

                this.$store.commit('setIdSolicitud', item.id)
                this.title = "Detalle de la Solicitud No. " + item.id
                this.fullscreen = true
                this.form = 'form'
                this.dark = true
                this.$refs.modal.show()

            },
            asignar(item){

                const usuario = JSON.parse(localStorage.getItem('app-catastro-enlinea'))

                this.$store.commit('setIdSolicitud', item.id)
                this.title = "Asignar Responsable Solicitud " + item.id
                this.fullscreen = false
                this.form = 'usuario'
                this.width = '500'
                this.$store.dispatch('obtener_tecnicos', usuario.nit)
                this.dark = false
                this.$refs.modal.show()

            }

        },
        created(){

            this.obtener_solicitudes()

        },
        computed: {

            table_data(){

                return this.$store.getters.getSolicitudes
            },
            busqueda(){
                return this.$store.getters.getSearch
            },
            usuario(){

                return JSON.parse(localStorage.getItem('app-catastro-enlinea'))

            }

        }
    }
</script>

<style>

</style>