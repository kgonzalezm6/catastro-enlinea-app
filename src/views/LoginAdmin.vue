<template>
    <div>
        <v-container>
            <v-row align="center" justify="center" style="height: 100vh">
                <v-col cols="12" md="6">
                    <Form></Form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import Form from '@/components/LoginAdmin/Form'

    export default {
        components: {
            Form
        }
    }
</script>

<style>

</style>