<template>
    <div>
        <v-row class="mb-2">

            <v-col cols="6" v-for="(tipo, key) in tipos_usuarios" :key="key">
                <v-hover v-slot="{ hover }">

                    <v-card @click="seleccionar_tipo(tipo)" :elevation="hover ? 12 : 0"
                        :color="!tipo.select ? 'grey lighten-1' : 'primary'" :dark="tipo.select" min-height="170"
                        max-height="170">
                        <v-card-text class="text-center">
                            <v-row justify="center">
                                <v-col cols="4">
                                    <v-img contain :src="require('@/assets/img/' + tipo.image)"></v-img>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-text class="text-center subtitle-1 pt-0">
                            {{ tipo.nombre }}
                        </v-card-text>

                    </v-card>
                </v-hover>
            </v-col>

        </v-row>

        <v-divider class="mt-4"></v-divider>

        <v-row>
            <v-col>
                <v-btn color="primary" @click="continuar()" :disabled="!tipo_usuario">
                    CONTINUAR
                </v-btn>

                <v-btn @click="() => { this.$router.push('/') }" class="ml-2" text>
                    CANCELAR
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
//import Swal from 'sweetalert2'
import request from '@/functions/request.js'

export default {
    data() {
        return {
            tipos_usuarios: []
        }
    },
    methods: {
        seleccionar_tipo: function (tipo) {

            // Desmarcar todos
            this.tipos_usuarios.forEach(tipo => {

                tipo.select = false

            });

            tipo.select = !tipo.select

            this.$store.commit('setTipoUsuario', tipo.id)

        },
        obtener_tipos_usuario() {

            const data = {
                url: 'obtener_tipos_usuario',
                data: null
            }

            request.get(data)
                .then((response) => {
                    this.tipos_usuarios = response.data
                })

        },
        continuar() {

            this.$store.commit('setStep', 2)
        }
    },
    computed: {
        tipo_usuario() {

            return this.$store.getters.getTipoUsuario

        }
    },
    created() {

        // Reset proceso 
        this.$store.dispatch('resetProceso')

        this.obtener_tipos_usuario()

    }
}
</script>

<style></style>