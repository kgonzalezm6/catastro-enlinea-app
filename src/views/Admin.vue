<template>
    <div>
        <v-container>

            <Header>
                <template #actions>
                    <v-row align="end" justify="end">
                        <v-col cols="8">
                            <v-text-field v-model="search" clearable prepend-icon="mdi-magnify" hide-details label="Buscar..."></v-text-field>
                        </v-col>
                    </v-row>
                </template>
            </Header>
            
            <Filtro></Filtro>

            <Table class="mt-4"></Table>
            
        </v-container>
    </div>
</template>

<script>

    import Table from '@/components/Admin/Table'
    import Header from '@/components/Admin/Header'
    import Filtro from '@/components/Admin/Filtro'
    
    import { mapMutations } from 'vuex'
    
    export default {
        components: {
            Table,
            Header,
            Filtro
        },
        methods: {

            ...mapMutations([
                'setSearch'
            ])

        },
        computed: {
            search: {
                get(){
                    return this.$store.state.search
                },
                set(val){
                    this.setSearch(val)
                    
                }
            }
        }
    }
</script>

<style>

</style>