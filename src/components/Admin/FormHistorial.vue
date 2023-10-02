<template>
    <div>
        <v-container>
            <v-form @submit.prevent="registrar()" v-model="valid" ref="form">
                <v-row class="mt-2">
                    <v-col>
                        <v-textarea :rules="[v => !!v]" v-model="comentario" hide-details outlined label="Comentario"></v-textarea>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col align="center">
                        <v-btn large type="submit" class="elevation-0" color="success">
                            ACEPTAR 
                        </v-btn>
                        <v-btn large @click="closeModal()" class="ml-2 elevation-0" color="secondary">
                            CANCELAR 
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                valid: true,
                comentario: null
            }
        },
        methods: {

            registrar(){

                this.$refs.form.validate()

                if(this.valid){

                    this.$store.dispatch('registrar_comentario', this.comentario)

                }

            },
            closeModal(){

                this.valid = true
                this.comentario = null
                this.$refs.form.resetValidation()
                this.$emit('closeModal')

            }

        }
    }
</script>

<style>

</style>