<template>
    <div>

        <v-row>
            <v-col cols="3" v-for="(item, key) in filtros" :key="key">
                <CardFiltro :item="item"></CardFiltro>
            </v-col>
        </v-row>
    </div>
</template>

<script>

    import CardFiltro from '@/components/Admin/CardFiltro'

    export default {

        components: {
            CardFiltro
        },
        data(){
            return{
                filtros: [
                    {
                        icon: 'mdi-thumb-up',
                        color: 'success',
                        label: 'Finalizadas',
                        getter: 'getAceptadas',
                        estado: 'A'
                    },
                    {
                        icon: 'mdi-thumb-down',
                        color: 'error',
                        label: 'Rechazadas',
                        getter: 'getRechazadas',
                        estado: 'R'
                    },
                    {
                        icon: 'mdi-alarm',
                        color: 'primary',
                        label: 'En Proceso',
                        getter: 'getEnProceso',
                        estado: 'T'
                    },
                ]
            }
        },
        computed: {

            aceptadas(){

                return this.$store.getters.getAceptadas

            },
            rechazadas(){

                return this.$store.getters.getRechazadas

            }

        }

    }
</script>

<style>

</style>