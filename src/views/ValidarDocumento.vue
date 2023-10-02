<template>
    <div>
        <v-container>

            <Header>
                <template #action>
                    <a href="#/">
                        <div><i class="icon-ornato"></i>Inicio </div>
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
    import Footer from '@/components/Login/Footer'
    import Form from '@/components/ValidarDocumento/Form'

    export default {
        components: {
            Header,
            Footer,
            Form
        }
    }
</script>

<style>

</style>