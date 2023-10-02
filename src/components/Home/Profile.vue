<template>
    <div class="pt-4 pl-4 pr-4 pb-4">

        <v-row>
            <v-col>
                <v-btn color="grey lighten-1" icon small>
                    <v-icon>
                        mdi-cog
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row align="center" justify="center" >
            <v-col cols="6">
                <img position="center center" width="100" src="@/assets/img/info.png">
            </v-col>
            <v-col class="pb-0" align="center" cols="12">
                <span class="subtitle white--text">
                    {{ userData.nombre }}
                </span>
            </v-col>
            <v-col class="pt-0" align="center">
                <v-chip label small class="mt-1" color="success">
                    {{ userData.jefe == '1' ? 'Administrador' : 'Operador' }}
                </v-chip>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        computed: {

            userData(){
			
                const data = JSON.parse(localStorage.getItem('app-catastro-enlinea'))

                return data

            },

        }
    }
</script>

<style>

</style>