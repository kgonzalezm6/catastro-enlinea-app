<template>
    <div class="mt-4">
        <v-row>
            <v-col>
                <span class="text-h5 indigo--text">
                    ¡Bienvenido(a) <strong class="indigo--text">{{ userData.nombres }} {{ userData.apellidos }}</strong>!
                </span>
            </v-col>
            <v-col class="text-right">
                <v-btn :to="{name: 'configuracion'}" elevation="0" dark color="#10069f">Configuración
                    <v-icon>
                        mdi-account-cog
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        computed: {
            userData(){
                const data = JSON.parse(localStorage.getItem('catastro_user'))

                return data
            },
        }
    }
</script>