<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onIniciarSesion">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="correo"
                                            label="Correo electrónico"
                                            id="correo"
                                            v-model="correo"
                                            type="String"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="Contraseña"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">
                                            Iniciar sesión
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default{
        data(){
            return{
                correo: '',
                password: ''
            } 
        },
        computed:{
            user(){
                return this.$store.getters.user // Se refiere al user recién creado
            }
        },
        watch: {
            user(value){
                if(value !== null && value !== undefined){
                    this.$router.push('/') // Si el usuario se registra exitosamente, regresar a la raíz
                }
            } // Lo agarra cada vez que el getter devuelve algo nuevo
        },
        methods: {
            // Lo que sucede cuando se clickea el botón de registrarse
            onIniciarSesion(){
                // Muestra en consola lo que metió el usuario
                console.log({email: this.correo, password: this.password})
                this.$store.dispatch('iniciarSesionUsuario', {correo: this.correo, password: this.password})
            }
        }
    }
</script>