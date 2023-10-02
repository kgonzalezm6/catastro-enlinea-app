<template>
    <div>
        <v-container class="pl-10 pr-10">
            <v-form @submit.prevent="login()" v-model="valid" ref="form">
                <v-row justify="center" class="text-center">
                    <v-col class="text-center" cols="6">
                        <v-img width="200" contain :src="require('@/assets/img/logo_muni.jpg')"></v-img>
                    </v-col>
                    <v-col cols="12">
                        <span class="overline">Servicios Catastrales en Línea</span>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    
                    <v-col cols="12">
                        <v-text-field :rules="[v => !!v]" clearable v-model="usuario.usuario" type="text" hide-details autocomplete="off" label="Usuario" filled></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field :rules="[v => !!v]" clearable v-model="usuario.password" type="password" autocomplete="off" label="Contraseña" filled></v-text-field>
                    </v-col>
                    <v-col class="pt-0" v-if="loginError">
                        <v-alert text :value="loginError" type="error">
                            {{ loginMessage }}
                            <template v-slot:close="{  }">
                                <v-icon color="error" @click="setLoginStatus(false)">
                                    mdi-close-circle
                                </v-icon>
                            </template>
                        </v-alert>
                    </v-col>
                    <v-col cols="12">
                        <v-btn type="submit" class="elevation-0" color="primary" block>Ingresar</v-btn>
                    </v-col>
                    
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>

    import { mapActions, mapState, mapMutations } from 'vuex'

    export default {
        data(){
            return{
                usuario: {
                    usuario: null,
                    password: null
                },
                valid: true
            }
        },
        methods: {

            ...mapActions('login', [
                'doLogin'
            ]),
            login(){

                this.$refs.form.validate()

                if(this.valid){

                    this.doLogin(this.usuario)

                }

            },
            ...mapMutations('login', [
                'setLoginStatus'
            ])

        },
        computed: {

            ...mapState('login', [
                'loginError', 
                'loginMessage'
            ])

        }
    }
</script>

<style>

</style>