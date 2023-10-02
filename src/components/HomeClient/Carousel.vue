<template>
    <div>
        <v-row class="mt-4">
            <v-col cols="12">
                <v-carousel height="300">
                    <v-carousel-item
                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.src"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                    ></v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                items: [
                    {
                        src: 'https://udicat.muniguate.com/apps/catastro-enlinea-app/hero-n-6.jpeg',
                    },
                    
                ],
            }
        }
    }
</script>