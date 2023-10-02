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
                    <v-row justify="center" dense>
                        <v-col cols="6" md="6" lg="6">
                            <v-radio-group v-model="trimestre">
                                <v-radio
                                    v-for="(t, key) in trimestres"
                                    :key="key"
                                    :label="t.text"
                                    :value="t.value"
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col class="text-center" cols="6" md="6" lg="6">
                            <v-btn @click="obtener_requerimiento" :disabled="!matricula_select || !trimestre" elevation="0" dark color="#10069f">
                                Generar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col v-if="!emptyMessage && !loading" cols="12" md="6" lg="6">
                    <v-row justify="center">
                        <v-col cols="12">
                            <embed :src="pdf_url" width="100%" height="550" 
                            type="application/pdf">
                            <PDFPreview />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col align-self="center" v-if="emptyMessage && !loading">
                    <v-alert icon="mdi-alert-octagon" text border="left" color="red">
                        {{ emptyMessage }}
                    </v-alert>
                </v-col>

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
        components: {
            PDFPreview,
            Breadcrumb,
            LottieAnimation
        },
        data(){
            return{
                items: [
                    {
                        text: 'Inicio',
                        disabled: false,
                        to: '#/productos_catastrales',
                    },
                    {
                        text: 'Requerimiento de Pago',
                        disabled: true,
                        to: null,
                    },
                ],
            }
        },
        methods: {
            ...mapActions('perfil_contribuyente', [
                'obtener_matriculas',
                'obtener_requerimiento',
                'obtener_trimestres'
            ]),
            ...mapMutations('perfil_contribuyente', [
                'setMatricula',
                'setTrimestre'
            ])
        },
        computed: {
            ...mapState('perfil_contribuyente', {
                matriculas: state => state.matriculas,
                pdf_url: state => state.pdf_url,
                trimestres: state => state.trimestres,
                emptyMessage: state => state.emptyMessage,
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
            trimestre: {
                get(){
                    return this.$store.state.perfil_contribuyente.trimestre
                },
                set(val){
                    this.setTrimestre(val)
                }
            },
            api_cedula(){
                return process.env.VUE_APP_CEDULA_URL
            }
        },
        mounted(){
            this.obtener_matriculas()
            this.obtener_trimestres()
        }
    }
</script>