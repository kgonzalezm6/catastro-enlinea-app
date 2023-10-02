<template>
    <div>

        <v-container>
            <Header v-if="!regCatasEnlinea">
                <template #action>
                    <a href="#/">
                        <div><i class="icon-user"></i> Login </div>
                    </a>
                </template>
            </Header>

            <Form></Form>
        </v-container>

    </div>
</template>

<script>

import Header from '@/components/Login/Header'
import Form from '@/components/Registro/Form'

export default {
    components: {
        Header,
        Form
    },
    data(){
        return {
            getemail: this.$route.params.email,
            regCatasEnlinea: false
        }
    },
    methods: {
        checkEmail(){
            if (this.getemail){
                this.regCatasEnlinea = true
            } else {
                this.regCatasEnlinea = false
            }
        }
    },
    mounted(){
        this.checkEmail()
    }
}
</script>

<style>

</style>