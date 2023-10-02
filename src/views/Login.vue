<template>
    <div>
        <v-container>
            
            <Header>
                <template #action>
                    <a href="#/validar_documento">
                        <div><i class="icon-ornato"></i> Validar Documento </div>
                    </a>
                    <a href="#/registro">
                        <div><i class="icon-user"></i> Registro </div>
                    </a>
                </template>
            </Header>
            
            <Form></Form>

            <Footer></Footer>

        </v-container>
    </div>
</template>

<script>

import Header from '@/components/Login/Header'
import Form from '@/components/Login/Form'
import Footer from '@/components/Login/Footer'

export default {
    components: {
        Header,
        Form,
        Footer
    }
}
</script>

<style>
    
</style>