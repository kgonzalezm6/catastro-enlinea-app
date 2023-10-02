<template>
    <div>
        <v-row class="mt-2" justify="center">
            <v-col cols="8">
                <v-row justify="center">
                    <v-col cols="12">
                        <v-card elevation="0" min-height="150" outlined>

                            <v-card-text>

                                <v-text-field class="elevation-0" hint="Presione enter para agregar" persistent-hint  @keydown.enter="matricula ? agregar() : null" v-model="matricula" label="No. de Matricula" @click:append="matricula ? agregar() : null"></v-text-field>

                            </v-card-text>

                            <v-card-text v-if="matriculas.length == 0" align="center" class="text-center">
                                <v-row justify="center" align="center">
                                    <v-col cols="4">
                                        <v-img contain src="@/assets/img/info.png"></v-img>
                                    </v-col>
                                </v-row>
                                <h5 class="mt-4">Debe de ingresar al menos una matricula</h5>
                            </v-card-text>

                            <v-card-text class="overline" v-if="matriculas.length > 0">
                                Matriculas a registrar:
                            </v-card-text>
                            <v-list-item v-for="(matricula, key) in matriculas" :key="key" dense>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="text-h4">{{ matricula }}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn x-small @click="eliminar_matricula(key)" icon>
                                        <v-icon color="error">mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>

                        </v-card>
            
                    </v-col>
                </v-row>
           </v-col> 
        </v-row>

        <v-divider class="mt-10"></v-divider>
        
        <v-row>
            <v-col>
                <v-btn @click="pasos_registro.length >= step ? forward() : registrar()" :disabled="saving" :loading="saving" color="primary">CONTINUAR</v-btn>

				<v-btn :disabled="saving" @click="back()" class="ml-2" text>ATRÁS</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>

    import Swal from 'sweetalert2'
    
    import { mapGetters } from 'vuex'

	export default {
		data(){
			return{
				step: 3,
                matricula: null
			}
		},
		methods: {

            agregar(){

                this.$store.commit('setMatricula', this.matricula)
                this.matricula = null

            },
            registrar(){

                if (this.matriculas.length > 0) {
                    
                    this.$store.dispatch('createUser')


                }else{

                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Debe de ingresar al menos una matricula!',
                    })

                }
               
            },
			back(){

				this.$store.commit('setStep', 2)

			},
            eliminar_matricula(key){

                this.$store.commit('removeMatricula', key)

            },
            forward(){

                if (this.matriculas.length > 0) {

                    this.$store.commit('setStep', 4)

                }else{

                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Debe de ingresar al menos una matricula!',
                    })

                }
            }

		},
        computed: {
            ...mapGetters({
                saving: 'getSaving',
                pasos_registro: 'getPasosRegistro'
            }),
            datos_formulario(){

                return this.$store.getters.getDatosFormulario

            },
            matriculas(){

                return this.$store.getters.getMatriculas

            }
        }
	}
</script>