<template>
    <div>
        <v-card @click="() => {

            if(estado == item.estado){
                setEstado(null)
            }else{
                setEstado(item.estado)
            }    

            getSolicitudes()
            
        }" dark :color="item.color" :elevation="estado == item.estado ? 12 : 0">
            <v-card-text>
                <v-row align="center">
                    <v-col cols="3">
                        <v-btn dark icon>
                            <v-icon size="40">
                                {{ item.icon }}
                            </v-icon>
                        </v-btn>
                    </v-col>
                    <v-col justify="center" class="text-center">
                        <small small label>
                            {{ item.label }}
                        </small>
                        <br>
                        <span label class="text-h4 pt-4 pb-4">
                            {{ total }}
                        </span>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    
    import { mapActions, mapMutations } from 'vuex'
    
    export default {
        props: {
            item: Object
        },
        methods: {
            ...mapMutations([
                'setEstado'
            ]),
            ...mapActions([
                'getSolicitudes'
            ])
        },
        computed: {
            total(){

                return this.$store.getters[this.item.getter]

            },
            estado(){

                return this.$store.getters.getEstado

            }
        }
    }
</script>

<style>

</style>