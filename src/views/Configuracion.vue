<template>
    <div>
        <v-container fill-height>
            <v-row class="mt-2" justify="center">
                <v-col cols="12">
                    <Breadcrumb :items="items" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="3" md="4" sm="4">
                    <ConfigOptions />
                </v-col>
                <v-col>
                    <router-view></router-view>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import Breadcrumb from '@/components/HomeClient/Breadcrumb'
    import ConfigOptions from '@/components/HomeClient/ConfigOptions'

    export default {
        components: {
            Breadcrumb,
            ConfigOptions
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
                        text: 'Configuración',
                        disabled: true,
                        to: null,
                    },
                ],
            }
        }
    }
</script>