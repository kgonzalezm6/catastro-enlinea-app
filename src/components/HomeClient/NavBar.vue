<template>
    <div>
        <v-app-bar color="#fff" elevation="1" height="120">
            <v-toolbar-title>
                <v-img width="100" contain :src="require('@/assets/img/logo_muni.jpg')"></v-img>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn @click="doLogout" elevation="0" dark color="#10069f">Salir 
                <v-icon>
                    mdi-logout
                </v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>

    import { mapActions } from 'vuex'

    export default {
        methods: {
            ...mapActions('login_client', [
                'doLogout'
            ])
        }
    }
</script>