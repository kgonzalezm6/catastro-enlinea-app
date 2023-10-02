<template>
    <div>
        <v-card outlined color="blue-grey lighten-5" min-height="200">
            <v-card-text>
                <span class="overline">Roles</span>
            </v-card-text>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-default-footer
                    dense
                    fixed-header
                    height="210"
                    class="matriculas"
                >
                    <template v-slot:[`item.estatus`]="{ item }">
                        <v-chip :color="item.estatus == 'P' ? 'warning' : item.estatus == 'R' ? 'error' : 'success'" label x-small>
                            {{ item.estatus == 'P' ? 'PENDIENTE' : item.estatus == 'R' ? 'RECHAZADA' : 'ACEPTADA' }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-btn icon x-small @click="cambiar_estado_rol({estado: 'A', item: item})" color="success">
                            <v-icon>
                                {{ item.estatus == 'A' ? 'mdi-check-circle' : 'mdi-check-circle-outline' }}
                            </v-icon>
                        </v-btn>
                        <v-btn icon x-small @click="cambiar_estado_rol({estado: 'R', item: item})" color="error">
                            <v-icon>
                                {{ item.estatus == 'R' ? 'mdi-close-circle' : 'mdi-close-circle-outline' }}
                            </v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
        </v-card-text>
        </v-card>
        
    </div>
</template>

<style>
    .matriculas.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        font-size: 12px !important;
    }
</style>
<script>

    import { mapActions, mapState } from 'vuex'

    export default {
        data(){
            return{
                headers: [
                    {
                        text: 'Rol',
                        value: 'nombre',
                        sortable: false,
                        width: '30%'
                    },
                    {
                        text: 'No. de Solicitud',
                        value: 'solicitud_id',
                        sortable: false,
                        width: '30%'
                    },
                    {
                        text: 'Estado',
                        value: 'estatus',
                        sortable: false,
                        width: '20%'
                    },
                    {
                        text: 'Acción',
                        value: 'action',
                        align: 'right',
                        sortable: false,
                        width: '10%'
                    },
                ],
            }
        },
        methods: {
            ...mapActions([
                'cambiar_estado_rol'
            ])
        },
        computed: {
            ...mapState({
                items: state => state.admin.detalle_solicitud.roles
            })
        }
    }
</script>