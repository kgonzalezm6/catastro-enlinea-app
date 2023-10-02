<template>
    <div>
        <div class="container-main">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <div class="w-login">
                            <div class="card-login">
                                <div class="title-main">
                                    <h1>Catastro <br>en línea</h1>
                                </div>
                                <v-form @submit.prevent="doLogin" autocomplete="off">
                                    <div class="form-group">
                                        <input outlined v-model="user.email" name="username" type="email" class="form-control" placeholder="Correo electrónico *" required="" autofocus="" maxlength="50" />
                                    </div>
                                    <div class="form-group">
                                        <input v-model="user.password" name="passw" type="password" class="form-control" placeholder="Contraseña *" required="" autocomplete="on" maxlength="30">
                                    </div>

                                    <label class="forgot-password"> <a >¿Has olvidado tu contraseña?</a> </label>
                                    <div class="button-right">
                                       
                                                <v-progress-circular
                                                    v-if="loading"
                                                    indeterminate
                                                    color="secondary"
                                                    class="mr-4"
                                                ></v-progress-circular>
                                                <button :disabled="loading || (!user.email || !user.password)" type="submit" class="btn btn-2 btn-custom">Entrar</button>
                                            </div>

                                    <v-row v-if="error_msg" class="mt-2">
                                        <v-col>
                                            <v-alert icon="mdi-alert-octagon" text border="left" color="red">
                                                {{ error_msg }}
                                            </v-alert>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
            
    </div>
</template>

<script>

    import { mapState, mapActions } from 'vuex'

    export default {
        methods: {
            ...mapActions('login_client', [
                'doLogin'
            ])
        },
        computed: {
            ...mapState('login_client', {
                user: state => state.user,
                loading: state => state.loading,
                error_msg: state => state.error_msg
            })
        }
    }
</script>

<style>
    .title-main{
        font-family: var(--font-official);
        font-size: 2.5em;
        color: var(--blue-official);
        margin: 0;
        text-transform: uppercase;
        padding-bottom: 25px;
        font-weight: 600;
    }
</style>