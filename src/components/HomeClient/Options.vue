<template>
    <div>
        <v-row class="mt-4">
            <v-col cols="12" sm="6" md="6" lg="4" xl="3" v-for="(option, key) in options" :key="key">
                <Option :item="option" />
            </v-col>
        </v-row>
    </div>
</template>

<script>

    import Option from '@/components/HomeClient/Option'

    export default {
        components: {
            Option
        },
        data(){
            return{
                options: [
                    { 
                        title: 'Cédula Catastral', 
                        icon: 'mdi-view-dashboard',
                        to: 'cedula_catastral',
                        enable: true 
                    },
                     { 
                        title: 'Requerimiento de Pago', 
                        icon: 'mdi-view-dashboard',
                        to: 'requerimiento_pago',
                        enable: true
                    },
                    { 
                        title: 'Estado de cuenta', 
                        icon: 'mdi-view-dashboard',
                        to: 'estado_cuenta',
                        enable: true
                    },
                ]
            }
        }
    }
</script>