<template>
    <div>
        <v-container fill-height>
            <v-row>
                <v-col>
                    <span class="overline text-button">Roles</span>
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
                            Solicitar Nuevo Rol 
                        </h3>
                        
                        Para poder agregar un nuevo rol a su perfil, es necesario realizar una solicitud para su asignación. 
                        
                        <v-divider
                            class="my-4 indigo"
                            style="opacity: 0.22"
                        ></v-divider>

                        <v-form @submit.prevent="check_request" ref="form" v-model="valid">
                            <v-row>
                                <v-col cols="6">
                                    <v-select @change="fetch_campos_especiales(rol.id)" :rules="[v => !!v]" v-model="rol.id" label="Seleccione un rol" :items="roles_faltantes" item-text="nombre" item-value="id" hide-details autocomplete="off" color="indigo" outlined></v-select>
                                </v-col>
                                <v-col md="6" cols="12" v-for="(campo, key) in campos_especiales" :key="key">
                                    <v-row dense>
                                        <v-col v-if="campo.campo == 'representacion_legal'" cols="12">
                                            <v-text-field md="6" v-model="rol.representacion_legal" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Nombre de la entidad"></v-text-field>
                                        </v-col>
                                        <v-col v-if="campo.campo == 'carne_abogado'" cols="12">
                                            <v-text-field v-model="rol.carne_abogado" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Carné de Abogado"></v-text-field>
                                        </v-col>
                                        <v-col v-if="campo.campo == 'carne_valuador'" cols="12">
                                            <v-text-field v-model="rol.carne_valuador" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Licencia No."></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                 <v-col>
                                    <v-btn :loading="loading" :disabled="loading" :dark="!loading" type="submit" color="indigo" large elevation="0">
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
                            <v-chip :color="item.estatus == 'P' ? 'warning' : item.estatus == 'R' ? 'error' : 'success'" label small>
                                {{ item.estatus == 'P' ? 'PENDIENTE' : item.estatus == 'R' ? 'RECHAZADA' : 'ACEPTADA' }}
                            </v-chip>
                            <!-- <v-chip label small :color="item.color">
                                {{ item.estado }}
                                
                            </v-chip> -->
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
                headers: [
                    {
                        text: 'Rol',
                        align: 'start',
                        sortable: false,
                        value: 'nombre',
                        width: '50%'
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
                ],
                valid: true,
                rol: {
                    id: null,
                    representacion_legal: null,
                    carne_abogado: null,
                    carne_valuador: null
                }
            }
        },
        methods: {
            ...mapActions('config_contribuyente', [
                'fetch_roles',
                'solicitar_rol',
                'fetch_campos_especiales'
            ]),
            check_request(){

                this.$refs.form.validate()

                if (this.valid) {
                    this.solicitar_rol(this.rol)
                }

            }
        },
        computed: {
            ...mapState('config_contribuyente', {
                items: state => state.roles,
                roles_faltantes: state => state.roles_faltantes,
                loading: state => state.loading,
                campos_especiales: state => state.campos_especiales
            })
        },
        mounted(){

            this.fetch_roles()

        }
    }
</script>

<style>

</style>