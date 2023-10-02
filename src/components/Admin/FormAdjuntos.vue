<template>
    <div>
        <v-container>
            <v-row class="mt-2" dense>
                <v-col>
                    <v-text-field hide-details outlined dense label="Buscar..."></v-text-field>
                </v-col>
                <v-col class="text-right">
                    <v-btn @click="show_upload = !show_upload" icon color="primary">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="show_upload">
                <v-col >
                    <v-card outlined color="#f0f0f0">
                        <v-card-text>
                            <v-form v-model="valid" @submit.prevent="checkUpload" ref="form">
                                <v-row align="center" dense no-gutters>
                                    <v-col cols="10">
                                        <v-file-input
                                            outlined
                                            dense
                                            prepend-inner-icon="mdi-paperclip"
                                            prepend-icon=""
                                            truncate-length="15"
                                            hide-details
                                            label="Adjuntar archivos..."
                                            multiple
                                            :rules="[v => !!v]"
                                            v-model="files"
                                        ></v-file-input>
                                    </v-col>
                                    <v-col class="text-right">
                                        <v-btn type="submit" :disabled="uploading" :loading="uploading" elevation="0" color="primary">
                                            <v-icon>
                                                mdi-upload
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">
                                    Nombre
                                </th>
                                <th class="text-right">
                                    Acciones
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(adjunto, key) in adjuntos" :key="key">
                                    <td>
                                        {{ adjunto.nombre }}
                                    </td>
                                    <td class="text-right">
                                        <a target="_blank" :download="adjunto.nombre" :href="server + 'archivos/' + adjunto.path" icon>
                                            <v-icon>mdi-download</v-icon>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex'

    export default {
        data(){
            return{
                server: process.env.VUE_APP_API_URL,
                show_upload: false,
                valid: true,
                files: []
            }
        },
        methods: {
            checkUpload(){

                this.$refs.form.validate()

                if (this.valid) {
                    
                    this.subirArchivos(this.files)

                }

            },
            ...mapActions([
                'subirArchivos'
            ])
        },
        computed: {
            adjuntos(){
                return this.$store.getters.getAdjuntos
            },
            ...mapState({
                uploading: state => state.admin.uploading,
            })
        }
    }
</script>

<style>

</style>