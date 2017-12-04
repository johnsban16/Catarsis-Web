<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed = "onDismissed" :text ="error.message"> </app-alert>
            </v-flex>
        </v-layout>  
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onRegistrarse">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="nombre"
                                            label="Nombre completo"
                                            id="nombre"
                                            v-model="nombre"
                                            type="String"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
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
                                        <v-text-field
                                            name="confirmPassword"
                                            label="Confirmar Contraseña"
                                            id="confirmPassword"
                                            v-model="confirmPassword"
                                            type="password"
                                            :rules="[compararPasswords]">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit" :disabled="loading" :loading="loading">
                                            Registrarse
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
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
                nombre: '',
                correo: '',
                password: '',
                confirmPassword:''
            } 
        },
        computed:{
            compararPasswords(){
                return this.password !== this.confirmPassword ? 'Las contraseñas no coinciden.' : ''
            },
            user(){
                return this.$store.getters.user // Se refiere al user recién creado
            },
            error(){
                return this.$store.getters.error
            },
            loading(){
                return this.$store.getters.loading
            }
        },
        watch: {
            user(value){
                if(value !== null && value !== undefined){
                    this.$router.push('/') // Si el usuario se registra exitosamente, regresar a la raíz
                }
            } // Lo agarra cada vez qu eel getter devuelve algo nuevo
        },
        methods: {
            // Lo que sucede cuando se clickea el botón de registrarse
            onRegistrarse (){
                // Muestra en consola lo que metió el usuario
                console.log({email: this.correo, password: this.password})
                this.$store.dispatch('registrarUsuario', {correo: this.correo, password: this.password, nombre: this.nombre})
            },
            onDismissed(){
                console.log('Dismissed Alert')
                this.$store.dispatch('clearError')
            }
        }
    }
</script>