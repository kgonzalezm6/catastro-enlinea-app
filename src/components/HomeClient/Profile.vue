<template>
    <div>
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
                    <span class="subtitle">
                        {{ userData.nombres }} {{ userData.apellidos }}
                    </span>
                </v-col>
            </v-row>
        </div>
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