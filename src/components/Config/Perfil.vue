<template>
    <div>
        <v-container fluid>
            <v-row class="mb-2">
                <v-col>
                    <span class="overline text-button">Datos Personales</span>
                </v-col>
            </v-row>
            <v-form @submit.prevent="check_update()" v-model="valid" ref="form">
                <v-row>
                    <v-col cols="6">
                        <v-text-field :rules="[v => !!v]" v-model="perfil.nombres" hide-details label="Nombres" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :rules="[v => !!v]" v-model="perfil.apellidos" hide-details label="Apellidos" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-select :rules="[v => !!v]" v-model="perfil.sexo" item-text="text" item-value="value" outlined label="Género" hide-details :items="genero"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :rules="[v => !!v]" v-model="perfil.telefono" hide-details label="Teléfono" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field :rules="[v => !!v]" v-model="perfil.direccion" hide-details label="Dirección" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :rules="[v => !!v]" v-model="perfil.email" hide-details label="Correo Electrónico" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn large elevation="0">Cancelar</v-btn>
                        <v-btn :loading="loading" :disabled="loading" type="submit" large elevation="0" color="#10069f" :dark="!loading" class="ml-4">Guardar</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex'


    export default {
        data(){
           return{
                genero: [
                    {
                        text: 'Hombre',
                        value: 'H'
                    },
                    {
                        text: 'Mujer',
                        value: 'M'
                    }
                ],
                valid: true
           }
       },
       methods: {
           ...mapActions('config_contribuyente', [
               'fetch_profile',
               'update_profile'
           ]),
           check_update(){

               this.$refs.form.validate()

               if (this.valid) {
                   
                   this.update_profile()

               }

           }
       },
       computed: {
           ...mapState('config_contribuyente', {
               perfil: state => state.perfil,
               loading: state => state.loading
           })
       },
       mounted(){

           this.fetch_profile()

       }
    }
</script>

<style>

</style>