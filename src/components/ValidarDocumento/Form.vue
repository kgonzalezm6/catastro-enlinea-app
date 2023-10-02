<template>
    <div>   
        <div class="container-main">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <div class="w-login">
                            <div class="card-login">
                                <div class="title-main">
                                    <h1>Validación <br>de Documentos</h1>
                                </div>
                                <v-form autocomplete="off" @submit.prevent="check_form()" v-model="valid" ref="form">
                                    <v-row dense>
                                        <v-col cols="12">
                                            <v-select item-text="nombre" item-value="id" v-model="documento.tipo" :rules="[v => !!v]" hide-details label="Seleccione el tipo de documento" :items="options" outlined ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="documento.numero" :rules="[v => !!v]" hide-details label="Número de documento" outlined></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" class="text-center">
                                            <v-btn type="submit" large color="#10069f" dark>Validar</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                                
                                <v-row v-if="loading">
                                    <v-col cols="12">
                                        <lottie-animation
                                            ref="anim"
                                            :animationData="require('@/assets/animations/loading.json')"
                                            :loop="true"
                                            :autoPlay="true"
                                        />
                                    </v-col>
                                </v-row>

                                <v-row class="mt-2" v-if="message && !loading">
                                    <v-col cols="12">
                                        <v-alert
                                            :type="type"
                                            text
                                            border="left"
                                        >
                                            {{ message }}
                                        </v-alert>
                                    </v-col>
                                    <v-col class="wrapper" v-if="pdf_url">
                                        <embed 
                                            :src="pdf_url" 
                                            width="100%" 
                                            height="550" 
                                            type="application/pdf"
                                        >
                                        <div class="embed-cover"></div>
                                    </v-col>
                                </v-row>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapState, mapMutations } from 'vuex'

    import LottieAnimation from 'lottie-web-vue'

    export default {
        components: {
            LottieAnimation
        },
        data(){
            return{
                valid: true,
                documento: {
                    tipo: null,
                    numero: null
                }
            }
        },
        methods: {

            ...mapActions('validacion', [
                'validar_documento',
                'servicios_disponibles'
            ]),
            ...mapMutations('validacion', [
                'clear_data'
            ]),
            check_form(){

                this.$refs.form.validate()

                if (this.valid) {
                    
                    this.validar_documento(this.documento)

                }

            }

        },
        computed: {
            ...mapState('validacion', {
                options: state => state.servicios,
                loading: state => state.loading,
                message: state => state.message,
                type: state => state.type,
                pdf_url: state => state.url + '#toolbar=0&navpanes=0&scrollbar=0'
            }),
        },
        mounted(){

            this.clear_data()
            this.servicios_disponibles()

        }
    }
</script>

<style>
    .embed-cover {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 30px;
        
        /* Just for demonstration, remove this part */
        /* opacity: 0.25;
        background-color: red; */
    }

    .wrapper {
        position: relative;
        overflow: hidden;
    }

</style>