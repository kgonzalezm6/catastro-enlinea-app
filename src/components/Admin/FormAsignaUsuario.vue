<template>
    <div>
        <v-container>
            <v-form @submit.prevent="registrar()" v-model="valid" ref="form">
                <v-row justify="center" class="mt-2 mb-2">
                    <v-col cols="10">
                        <v-select v-model="tecnico" :items="tecnicos" item-text="nombre" item-value="usuario" hide-details outlined label="Responsable"></v-select>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col align="center">
                        <v-btn type="submit" class="elevation-0" color="success">
                            ACEPTAR 
                        </v-btn>
                        <v-btn class="ml-2 elevation-0" color="secondary">
                            CANCELAR 
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>
    
    import { mapActions } from 'vuex'

    export default {
        data(){
            return{
                valid: true,
                tecnico: null
            }
        },
        computed: {
            tecnicos(){
                return this.$store.getters.getTecnicos
            }
        },
        methods: {

            registrar(){

                this.$refs.form.validate()

                if(this.valid){

                    this.$store.dispatch('asignar_tecnico', this.tecnico)
                }

            },
            ...mapActions([
                'asignar_tecnico'
            ])

        }
    }
</script>

<style>

</style>