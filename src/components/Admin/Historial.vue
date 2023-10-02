<template>
    <div>
        <v-card outlined color="blue-grey lighten-5" min-height="300" max-height="300">
            <v-card-text>
                <v-row>
                    <v-col>
                        <span class="overline">Historial</span>
                    </v-col>
                    <v-col align="end">
                        <v-btn @click="mostrar_modal()" color="primary" icon small>
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-text  v-if="items.length > 0">

                <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-default-footer
                    dense
                    fixed-header
                    height="210"
                    class="historial"
                    :items-per-page="9999"
                >
                    <template v-slot:[`item.estado`]="{ item }">

                        <v-chip :color="item.estado == 'P' ? 'warning' : item.estado == 'R' ? 'error' : 'success'" label x-small>
                            {{ item.estado == 'P' ? 'PENDIENTE' : item.estado == 'R' ? 'RECHAZADA' : 'CORRECTA' }}
                        </v-chip>

                    </template>

                    <template v-slot:[`item.usuario`]="{ item }">

                        {{ item.usuario_opera }}

                    </template>

                </v-data-table>
            </v-card-text>

            <v-card-text v-if="items.length == 0">

                <v-row justify="center" align="center">
                    <v-col align="center" cols="6">
                        <v-img width="100" src="@/assets/img/info.png"></v-img>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="text-center">
                        <span class="overline">
                            NO EXISTEN REGISTROS EN EL HISTORIAL
                        </span>
                    </v-col>
                </v-row>

            </v-card-text>

        </v-card>

        <Modal ref="modal" width="400" title="Agregar a historial" :dark="false" >

            <template #form>
                <FormHistorial @closeModal="closeModal()"></FormHistorial>
            </template>

        </Modal>
    </div>
</template>

<script>

    import Modal from '@/components/Modal'
    import FormHistorial from '@/components/Admin/FormHistorial'

    export default {
        components: {
            Modal,
            FormHistorial
        },
        data(){
            return{
                headers: [
                    {
                        text: 'Comentario',
                        value: 'comentario',
                        sortable: false
                    },
                    {
                        text: 'Usuario',
                        value: 'usuario',
                        sortable: false
                    },
                    {
                        text: 'Fecha',
                        value: 'created_at',
                        sortable: false,
                        align: 'right'
                    },
                ]
            }
        },
        methods: {
            mostrar_modal(){

                this.$refs.modal.show()

            },
            closeModal(){

                this.$refs.modal.close()

            }
        },
        computed: {
            items(){

                const data = this.$store.getters.getDetalleSolicitud

                return data.historial

            }
        }
    }   
</script>

<style>

    .historial.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        font-size: 12px !important;
    }

</style>