<template>
    <div>
        <v-container fill-height>
            <v-row class="mt-2" justify="center">
                <v-col cols="12">
                    <Breadcrumb :items="items" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6" lg="6">
                    <v-row class="mt-4">
                        <v-col cols="12">
                            <h1 class="indigo--text text-center">Matrículas Registradas</h1>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col cols="6" md="6" lg="6">
                            <v-select label="Seleccione una matrícula" v-model="matricula_select" :items="matriculas" item-text="matricula" item-value="matricula" hide-details outlined></v-select>
                        </v-col>
                    </v-row>
                     <v-row justify="center">
                        <v-col class="text-center" cols="6" md="6" lg="6">
                            <v-btn @click="obtener_cedula" :disabled="!matricula_select" elevation="0" dark color="#10069f">
                                Generar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                    <v-row v-if="pdf_url && !loading" justify="center">
                        <v-col cols="12">
                            <embed :src="pdf_url" width="100%" height="550" 
                            type="application/pdf">
                            <PDFPreview />
                        </v-col>
                    </v-row>

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

                </v-col>
            </v-row>
            
        </v-container>
    </div>
</template>

<script>

    import { mapActions, mapMutations, mapState } from 'vuex'

    import PDFPreview from '@/components/HomeClient/PDFPreview'
    import Breadcrumb from '@/components/HomeClient/Breadcrumb'

    import LottieAnimation from 'lottie-web-vue'

    export default {
        data(){
            return{
                items: [
                    {
                        text: 'Inicio',
                        disabled: false,
                        to: '#/productos_catastrales',
                    },
                    {
                        text: 'Cédula Catastral',
                        disabled: true,
                        to: null,
                    },
                ],
            }
        },
        components: {
            PDFPreview,
            Breadcrumb,
            LottieAnimation
        },
        methods: {
            ...mapActions('perfil_contribuyente', [
                'obtener_matriculas',
                'obtener_cedula'
            ]),
            ...mapMutations('perfil_contribuyente', [
                'setMatricula'
            ])
        },
        computed: {
            ...mapState('perfil_contribuyente', {
                matriculas: state => state.matriculas,
                pdf_url: state => state.pdf_url,
                loading: state => state.loading
            }),
            matricula_select: {
                get(){
                    return this.$store.state.perfil_contribuyente.matricula_select
                },
                set(val){
                    this.setMatricula(val)
                }
            },
            api_cedula(){
                return process.env.VUE_APP_CEDULA_URL
            }
        },
        mounted(){
            this.obtener_matriculas()
        }
    }
</script>
