<template>
    <div>
        <v-container fill-height>
            <v-row justify="center">
                <v-col cols="12" md="10" lg="10">
                    <Welcome />
                    <Carousel />
                    <Options />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import Welcome from '@/components/HomeClient/Welcome'
    import Carousel from '@/components/HomeClient/Carousel'
    import Options from '@/components/HomeClient/Options'

    import { mapActions } from 'vuex'

    export default {
        components: {
            Welcome,
            Carousel,
            Options
        },
        methods: {
            ...mapActions('perfil_contribuyente', [
                'clearData'
            ])
        },
        mounted(){

            this.clearData()

        }
    }
</script>