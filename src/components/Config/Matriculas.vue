<template>
    <div>
        <v-container fill-height>
            <v-row>
                <v-col>
                    <span class="overline text-button">Matrículas</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-alert
                        icon="mdi-shield-lock-outline"
                        prominent
                        text
                        border="left"
                        colored-border
                        color="indigo"
                    >   
                        <h3 class="text-h5">
                            Agregar Matrículas 
                        </h3>
                            
                        Para poder agregar una nueva matrícula a su cuenta es necesario realizar un proceso de verificación.

                        <v-divider
                            class="my-4 indigo"
                            style="opacity: 0.22"
                        ></v-divider>

                        <v-form v-model="valid" @submit.prevent="check_request" ref="form">
                            <v-row
                                align="center"
                            >
                                <v-col cols="6">
                                    <v-text-field autocomplete="off" v-model="matricula" :rules="[v => !!v]" hide-details color="indigo" outlined label="Número de matrícula"></v-text-field>
                                </v-col>
                                <v-col align="center">
                                    <v-btn :loading="loading" :disabled="loading" type="submit" color="indigo" :dark="!loading" large elevation="0">
                                        Ingresar Solicitud
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        hide-default-footer
                        class="elevation-0"
                    >
                        <template v-slot:[`item.estado`]="{ item }">
                            <v-chip label small :color="item.estado == 'A' ? 'success' : item.estado == 'P' ? 'warning' : 'error'">
                                {{ item.estado == 'A' ? 'Aprobada' : item.estado == 'P' ? 'Pendiente' : 'Rechazada'  }}
                            </v-chip>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex'

    export default {
        data(){
            return{
                valid: true,
                matricula: null,
                headers: [
                    {
                        text: 'Número de Matrícula',
                        align: 'start',
                        sortable: false,
                        value: 'matricula',
                        width: '30%'
                    },
                    {
                        text: 'Número de Solicitud',
                        align: 'start',
                        sortable: false,
                        value: 'solicitud_id',
                        width: '20%'
                    },
                    {
                        text: 'Estado',
                        align: 'start',
                        sortable: false,
                        value: 'estado',
                        width: '25%'
                    },
                    {
                        text: 'Fecha de actualización',
                        align: 'start',
                        sortable: false,
                        value: 'created_at',
                        width: '25%'
                    },
                ]
            }
        },
        methods: {
            ...mapActions('config_contribuyente', [
                'fetch_matriculas',
                'solicitar_matricula'
            ]),
            check_request(){

                this.$refs.form.validate()

                if(this.valid){

                    this.solicitar_matricula(this.matricula)
                    .then(() => {

                        this.matricula = null
                        this.$refs.form.resetValidation()

                    })

                }

            }
        },
        computed: {
            ...mapState('config_contribuyente', {
                items: state => state.matriculas,
                loading: state => state.loading
            })
        },
        mounted(){

            this.fetch_matriculas()

        }
    }
</script>

<style>

</style>