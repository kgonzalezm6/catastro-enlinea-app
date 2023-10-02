<template>
    <div>
        <v-card color="#f7f7f7" outlined>
            <v-card-text>
                <v-list rounded color="#f7f7f7">
                    <v-list-item-group v-model="selectedItem" color="#10069f">
                        <v-list-item :to="{name: option.to}" v-for="(option, key) in options" :key="key">
                            <v-list-item-content>
                                <v-list-item-title>{{ option.text }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                options: [
                    {
                        id: 1,
                        text: 'Editar Perfil',
                        to: 'mi_perfil'
                    },
                    {
                        id: 2,
                        text: 'Matrículas',
                        to: 'matriculas'
                    },
                    {
                        id: 3,
                        text: 'Roles',
                        to: 'roles'
                    }
                ],
                selectedItem: null
            }
        }
    }
</script>