<template>
    <v-container>
        <v-flex xs12>
            <div>
                <form @submit.prevent="onSavedEntry">
                    <v-stepper v-model="e1">
                    <v-stepper-header>
                        <v-stepper-step step="1" :complete="e1 > 1">Descripción</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="2" :complete="e1 > 2">Pensamientos</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3">Resultados</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-content step="1">
                        <v-layout row>
                            <v-flex xs12 sm12 lg10>
                                
                                    <v-text-field
                                        label="Título de la entrada"
                                        v-model="title"
                                        required
                                    ></v-text-field>

                                    <v-text-field
                                        label="Descripción de la situación"
                                        v-model="description"
                                        multi-line
                                    ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-btn color="primary" @click.native="e1 = 2">Siguiente</v-btn>
                        <v-btn to="/Diary" >Cancelar</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-layout row>
                            <v-flex xs12 sm12 lg10>
                                <v-layout row >
                                    <v-dialog v-model="dialogEmotions" scrollable>
                                        <v-btn color="primary" dark slot="activator">Emociones</v-btn>
                                        <v-card>
                                            <v-card-title>Qué emociones sintió</v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text style="height: 300px;">
                                                <v-flex xs12 sm12 md10>
                                                <v-checkbox 
                                                    v-for="item in emotionsList"
                                                    :key="item.name"
                                                    :label="item.name"
                                                    v-model="emotions"
                                                    color="primary"
                                                    :value="item.name"
                                                    hide-details>
                                                </v-checkbox>
                                            </v-flex>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <v-card-actions>
                                            <v-btn color="blue darken-1" flat @click.native="dialogEmotions = false">Cerrar</v-btn>
                                            <v-btn color="blue darken-1" flat @click.native="dialogEmotions = false">Guardar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                        </v-dialog>
                                    <v-card-text>{{emotions.join(", ")}}</v-card-text>
                                </v-layout>
                                <v-layout row >
                                    <v-dialog v-model="dialogAnguish" scrollable>
                                        <v-btn color="primary" dark slot="activator">Angustia</v-btn>
                                        <v-card>
                                            <v-card-title>Especifique su nivel de angustia</v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text style="height: 300px;">
                                                <v-flex xs12 sm12 md10>
                                                <v-radio-group v-model="anguish" :mandatory="false">
                                                <v-radio 
                                                    v-for="item in anguishList"
                                                    :key="item.level"
                                                    :label="item.description"
                                                    color="primary"
                                                    :value="item.description"
                                                    >
                                                </v-radio>
                                                </v-radio-group>
                                            </v-flex>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <v-card-actions>
                                            <v-btn color="blue darken-1" flat @click.native="dialogAnguish = false">Cerrar</v-btn>
                                            <v-btn color="blue darken-1" flat @click.native="dialogAnguish = false">Guardar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                        </v-dialog>
                                    <v-card-text>{{anguish}}</v-card-text>
                                </v-layout>
                                <v-layout row >
                                    <v-dialog v-model="dialogDistortions" scrollable>
                                        <v-btn color="primary" dark slot="activator">Distorciones cognitivas</v-btn>
                                        <v-card>
                                            <v-card-title>Seleccione las distociones que siente en su pensamiento</v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text style="height: 300px;">
                                                <v-flex xs12 sm12 md12>
                                                <v-checkbox 
                                                    v-for="item in distortionsList"
                                                    :key="item.name"
                                                    :label="item.name"
                                                    v-model="distortions"
                                                    color="primary"
                                                    :value="item.name"
                                                    hide-details>
                                                </v-checkbox>
                                            </v-flex>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <v-card-actions>
                                            <v-btn color="blue darken-1" flat @click.native="dialogDistortions = false">Cerrar</v-btn>
                                            <v-btn color="blue darken-1" flat @click.native="dialogDistortions = false">Guardar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                        </v-dialog>
                                    <v-card-text>{{distortions.join(", ")}}</v-card-text>
                                </v-layout>
                                <v-layout row >
                                    <v-flex xs12 sm12 lg10>
                                            <v-text-field
                                                label="Describa sus pensamientos negativos"
                                                v-model="thought"
                                                multi-line
                                            ></v-text-field>
                                            <v-text-field
                                                label="Desafio"
                                                v-model="challenge"
                                                multi-line
                                            ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-btn color="primary" @click.native="e1 = 3">Siguiente</v-btn>
                        <v-btn @click.native="e1 = 1">Atrás</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-layout row>
                            <v-flex xs12 sm12 lg10>
                                            <v-text-field
                                                label="Escriba sus resultados"
                                                v-model="results"
                                                multi-line
                                            ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row >
                            <v-card-text>Indique su nuevo nivel de angustia</v-card-text>
                        </v-layout>
                        <v-layout row >
                                    <v-dialog v-model="dialogAnguish" scrollable>
                                        <v-btn color="primary" dark slot="activator">Angustia</v-btn>
                                        <v-card>
                                            <v-card-title>Especifique su nivel de angustia</v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text style="height: 300px;">
                                                <v-flex xs12 sm12 md10>
                                                <v-radio-group v-model="newAnguish" :mandatory="false">
                                                <v-radio 
                                                    v-for="item in anguishList"
                                                    :key="item.level"
                                                    :label="item.description"
                                                    color="primary"
                                                    :value="item.description"
                                                    >
                                                </v-radio>
                                                </v-radio-group>
                                            </v-flex>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <v-card-actions>
                                            <v-btn color="blue darken-1" flat @click.native="dialogAnguish = false">Cerrar</v-btn>
                                            <v-btn color="blue darken-1" flat @click.native="dialogAnguish = false">Guardar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                        </v-dialog>
                                    <v-card-text>{{newAnguish}}</v-card-text>
                                </v-layout>
                        <v-btn @click.native="e1 = 2">Atrás</v-btn>
                        <v-btn type="submit" :disabled="loading" :loading="loading" color="primary">Guardar</v-btn>
                    </v-stepper-content>
                    </v-stepper>   
                </form>     
            </div>
        </v-flex>
    </v-container>
</template>

<script>
  export default {
    data () {
        return {
            title:'',
            description:'',
            thought:'',
            challenge:'',
            results:'',

            e1: 0,
            dialogEmotions: false,
            dialogAnguish: false,
            dialogDistortions: false,
            emotions: [],
            anguish: '',
            distortions: [],
            newAnguish: '',
            emotionsList: [
            {name: 'Agobio'},
            {name: 'Ansiedad'},
            {name: 'Culpabilidad'},
            {name: 'Disgusto'},
            {name: 'Enfado'},
            {name: 'Inútil'},
            {name: 'Miedo'},
            {name: 'Sin esperanza'},
            {name: 'Tristeza'},
            {name: 'Vacio'},
            {name: 'Vergüenza'}
            ],
            anguishList: [
                {level: '0', description: "0 - Sin angustia"},
                {level: '1', description: "1 - Angustia leve"},
                {level: '2', description: "2 - Angustia moderada"},
                {level: '3', description: "3 - Angustia severa"},
                {level: '4', description: "4 - Angustia extrema"},
            ],
            distortionsList: [
                {name: 'Adivinación'},
                {name: 'Autoculpa'},
                {name: 'Castastrofización'},
                {name: 'Culpar a otros'},
                {name: 'Etiquetado'},
                {name: 'Filtrando lo positivo'},
                {name: 'Leer la mente'},
                {name: 'Maginificación de lo negativo'},
                {name: 'Minificación de los positivo'},
                {name: 'Pensamiento del todo o nada'},
                {name: 'Racionamiento emocional'},
                {name: 'Saltar a conclusiones'},
                {name: 'Sobregeneralización'},
                {name: 'Verbos deber/debería'}
            ],
        }
    },
    computed:{

    },
    methods:{
        onSavedEntry(){
            console.log({title: this.title, description: this.description, emotions: this.emotions})

        }
    }
  }
</script>