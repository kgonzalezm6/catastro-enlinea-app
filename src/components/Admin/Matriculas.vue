<template>
    <div>
        <v-card color="blue-grey lighten-5" outlined min-height="200">
            <v-card-text>
                <span class="overline">Matriculas</span>
            </v-card-text>
            <v-card-text v-if="items.length > 0">

                <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-default-footer
                    dense
                    fixed-header
                    height="210"
                    class="matriculas"
                >
                    <template v-slot:[`item.estado`]="{ item }">

                        <v-chip :color="item.estado == 'P' ? 'warning' : item.estado == 'R' ? 'error' : 'success'" label x-small>
                            {{ item.estado == 'P' ? 'PENDIENTE' : item.estado == 'R' ? 'RECHAZADA' : 'ACEPTADA' }}
                        </v-chip>

                    </template>

                    <template v-slot:[`item.action`]="{ item }">

                        <v-btn icon x-small @click="cambiar_estado_matricula(item, 'A')" color="success">
                            <v-icon>
                                {{ item.estado == 'A' ? 'mdi-check-circle' : 'mdi-check-circle-outline' }}
                            </v-icon>
                        </v-btn>

                        <v-btn icon x-small @click="cambiar_estado_matricula(item, 'R')" color="error">
                            <v-icon>
                                {{ item.estado == 'R' ? 'mdi-close-circle' : 'mdi-close-circle-outline' }}
                            </v-icon>
                        </v-btn>

                    </template>

                </v-data-table>
            </v-card-text>

            <v-card-text v-if="items.length == 0">

                <v-row justify="center" align="center">
                    <v-col align="center" cols="6">
                        <v-img width="150" src="@/assets/img/info.png"></v-img>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="text-center">
                        <span class="overline">
                            NO EXISTEN MATRICULAS QUE VERIFICAR
                        </span>
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                headers: [
                    {
                        text: 'Matricula',
                        value: 'matricula',
                        sortable: false
                    },
                    {
                        text: 'No. de Solicitud',
                        value: 'solicitud_id',
                        sortable: false
                    },
                    {
                        text: 'Estado',
                        value: 'estado',
                        sortable: false
                    },
                    {
                        text: 'Acción',
                        value: 'action',
                        align: 'right',
                        sortable: false
                    },
                ]
            }
        },
        methods: {

            cambiar_estado_matricula(item, estado){

                const data = {
                    id: item.id,
                    estado: estado
                }

                this.$store.dispatch('cambiar_estado_matricula', data)

            }

        },
        computed: {
            items(){

                const data = this.$store.getters.getDetalleSolicitud

                return data.matriculas

            }
        },
    }
</script>

<style>
    .matriculas.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        font-size: 12px !important;
    }
</style>