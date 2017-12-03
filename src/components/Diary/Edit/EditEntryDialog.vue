<template>
    <v-dialog width="350px" persistent scrollable> 
        <v-btn flat color="primary" accent slot="activator">Editar</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Editar pensamiento</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>

                            <v-flex xs12>
                                <v-text-field
                                    label="Título de la entrada"
                                    v-model="editedTitle"
                                    required
                                    value="asdasdf"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                    label="Descripción de la situación"
                                    v-model="editedDescription"
                                    multi-line
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                    label="Emociones percibidas"
                                    multiple
                                    chips
                                    :items="emotionsList"
                                    v-model="editedEmotionsList"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                    label="Angustia"
                                    :items="anguishList"
                                    v-model="editedAnguish"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                    label="Distorsiones cognitivas"
                                    multiple
                                    chips
                                    :items="distortionsList"
                                    v-model="editedDistortionsList"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                    label="Descripción de los pensamientos negativos"
                                    v-model="editedThought"
                                    multi-line
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                    label="Desafío por cumplir"
                                    v-model="editedChallenge"
                                    multi-line
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                    label="Resultados"
                                    v-model="editedResults"
                                    multi-line
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                    label="Nuevo nivel de angustia"
                                    :items="anguishList"
                                    v-model="editedNewAnguish"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*campo obligatorio</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Guardar</v-btn>
                </v-card-actions>
            </v-card>     
    </v-dialog>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        entry () {
            return this.$store.getters.loadedEntry(this.id)
        }
    },
    data () {
        return { // Devuelve esto
            editedTitle: '',
            editedDescription: '',
            editedEmotionsList: '',
            editedAnguish: '',
            editedDistortionsList: '',
            editedThought: '',
            editedChallenge: '',
            editedResults: '',
            editedNewAnguish: '',
            
            emotionsList: ['Agobio', 'Ansiedad', 'Culpabilidad', 'Disgusto', 'Enojo', 'Sentimiento de inutilidad', 'Miedo', 'Desesperanza', 'Tristeza', 'Vacío', 'Vergüenza', 'Tranquilidad', 'Felicidad', 'Agradecidecimiento', 'Valentía', 'Optimismo'],
            anguishList: ['0 - Sin angustia', '1 - Angustia leve', '2 - Angustia moderada', '3 - Angustia severa', '4 - Angustia extrema'],
            distortionsList: ['Saltar a conclusiones', 'Catastrofismo', 'Comparación', 'Pensamiento dicotómico', 'Descalificación de lo positivo', 'Razonamiento emocional', 'Adivinación', 'Etiquetado', 'Magnificación de lo negativo', 'Leer la mente', 'Minimización de lo positivo', 'Sobregeneralización', 'Perfeccionismo', 'Abstracción selectiva', 'Afirmaciones con "Debería"']
        }
    }
}
</script>