<template>
    <v-container>
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
                                            type="nombre"
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
                                            type="corre"
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
                                        <v-btn type="submit">
                                            Registrarse
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
            }
        },
        methods: {
            onRegistrarse (){

            }
        }
    }
</script>