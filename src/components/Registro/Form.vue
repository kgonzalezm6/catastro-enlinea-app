<template>
    <div>

        <div class="container-main">
            <!--It contains structure, form sign in-->
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="mt-4">
                            <v-stepper v-model="step">
                                <v-stepper-header>
                                    <v-row>
                                        <v-col>
                                            <v-stepper-step
                                                :complete="step > 1"
                                                step="1"
                                            >
                                                Tipo de Usuario
                                            </v-stepper-step>
                                        </v-col>
                                        <v-col v-for="(paso, key) in pasos_registro" :key="key">
                                            <v-stepper-step
                                                :complete="step > paso.step"
                                                :step="key + 2"
                                                :key="key"
                                            >
                                                {{ paso.nombre }}
                                            </v-stepper-step>
                                        </v-col>
                                    </v-row>
                                </v-stepper-header>
                                <v-stepper-items>
                                    <v-stepper-content step="1">
                                        <TipoUsuario></TipoUsuario>
                                    </v-stepper-content>

                                    <v-stepper-content v-for="(paso, key) in pasos_registro" :key="key" :step="key + 2">
                                        <component v-bind:is="paso.componente"></component>
                                    </v-stepper-content>

                                </v-stepper-items>
                            </v-stepper>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>

    // import TipoUsuario from '@/components/Registro/TipoUsuario'
    // import Matriculas from '@/components/Registro/Matriculas'
    // import Terminos from '@/components/Registro/Terminos'

    export default {
        components: {
            'Datos': () => import('@/components/Registro/Datos'),
            'TipoUsuario': () => import('@/components/Registro/TipoUsuario'),
            'Matriculas': () => import('@/components/Registro/Matriculas'),
            'Terminos': () => import('@/components/Registro/Terminos')
        },  
        data () {
            return {
                e1: null
            }
        },
        computed: {
            step(){
                return this.$store.getters.getStep
            },
            pasos_registro(){
                return this.$store.getters.getPasosRegistro
            }
        },
    }
</script>

<style>

</style>