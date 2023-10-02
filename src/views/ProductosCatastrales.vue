<template>
    <div>
        <v-app>
            <NavBar />
            <div class="green-line"></div>
            <Home v-if="route == 'productos_catastrales'" />
            <v-container v-else class="ml-0 pl-0 pr-0 mr-0 pt-0" fluid>
                <v-row justify="center">
                    <v-col cols="12" md="10" lg="10">
                        <router-view></router-view>
                    </v-col>
                </v-row>
			</v-container>
        </v-app>
    </div>
</template>

<style scoped>
    .green-line {
        height: 1.66667vh;
        background-color: #97d700;
        width: 100%;
        box-shadow: 0 .5rem .5rem rgba(0,0,0,.034),0 6.7px 5.3px rgba(0,0,0,.048),0 12.5px 10px rgba(0,0,0,.06),0 22.3px 17.9px rgba(0,0,0,.072),0 41.8px 33.4px rgba(0,0,0,.086),0 1rem 40rem rgba(0,0,0,.12);
    }
</style>

<script>

    // import Sidebar from '@/components/HomeClient/Sidebar'
    import NavBar from '@/components/HomeClient/NavBar'
    import Home from '@/components/HomeClient/Home'

    export default{
        components: {
            NavBar,
            Home
        },
        data(){
            return{
                items: [
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me 2' },
                ],
            }
        },
        computed: {
            route(){
                return this.$route.name
            }
        }
    }

</script>