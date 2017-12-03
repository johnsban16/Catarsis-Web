<template>
    <v-container>
        <!-- Este loading se muestra solo mientras se cargan los entrys -->
        <v-flex xs12 class="text-xs-center" v-if="loading">
            <v-progress-circular 
                indeterminate 
                class = "primary--text"
                :width ="7"
                :size="70"> 
            </v-progress-circular>
        </v-flex>
        
        <v-layout column v-if="!loading">
            <v-flex xs12>
            <!-- HEADER -->
            <v-card>
                <v-toolbar flat color="blue lighten-1" dark >
                    <v-toolbar-title>Pensamiento: {{entry.title}}</v-toolbar-title>
                </v-toolbar>

                <!-- DESCRIPCIÓN DEL PENSAMIENTO -->

                <v-expansion-panel expand>
                    <!-- <v-expansion-panel-content v-for="(item,i) in 5" :key="i" v-bind:value="item === 2"> -->
                    <v-expansion-panel-content>
                        <div slot="header">Título del pensamiento</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.title}}</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Fecha</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.date | date}}</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Descripción de la situación</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.description}}</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Emociones</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.emotions}}</v-card-text> <!-- Falta meter el filtro de array acá -->
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Nivel de angustia</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.anguish}}</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Distorsiones cognitivas</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.distortions}}</v-card-text> <!-- Falta meter el filtro de array acá -->
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Pensamientos negativos</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.thought}}</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Desafío</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.challenge}}</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Resultados</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.results}}</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header">Nuevo nivel de angustia</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">{{entry.newAnguish}}</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    
                </v-expansion-panel>

                

                <!-- FOOTER (AGREGAR ENTRADA)-->
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn to="/Diary">
                        Volver al diario
                    </v-btn>

                    <!-- FOOTER (AGREGAR ENTRADA)
                    <template v-if="!loading">
                        <app-edit-entry-dialog :entry="entry"></app-edit-entry-dialog>
                    </template>
                    -->

                    <!--************************ DIALOG DE EDIT EMPIEZA ACÁ ************************-->
                    <v-dialog width="350px" persistent scrollable v-model="editDialog"> 
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
                                                    label= "Título de la entrada"
                                                    v-model="editedTitle"
                                                    required
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
                                    <v-btn color="blue darken-1" flat @click="editDialog = false">Cerrar</v-btn>
                                    <v-btn color="blue darken-1" flat @click="onSaveChanges">Guardar</v-btn>
                                </v-card-actions>
                            </v-card>     
                    </v-dialog>
                    <!--************************ DIALOG DE EDIT TERMINA ACÁ ************************-->
                     
                    
                </v-card-title>
            </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  
export default {
    props: ['id'],
    computed: {
        entry () {
            return this.$store.getters.loadedEntry(this.id)
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined // Hay un usuario loggeado
        },
        userIsCreator () { // Devuelve si el usuario actual es el que creó la entry
            if(!this.userIsAuthenticated){ // Primero checkea si el usuario está signeado
                return false // Si no hay usuario no mostrar
            }
            return this.$store.getters.user.id == this.entry.creatorId
        },// Para solo mostrar la entrada al usuario dueño de esa entry de diario
        loading () {
            return this.$store.getters.loading
        }
    },
    data () {
        return { // Devuelve esto
            editDialog: false,

            editedTitle: this.$store.getters.loadedEntry(this.id).title,
            editedDescription: this.$store.getters.loadedEntry(this.id).description,
            editedEmotionsList: this.$store.getters.loadedEntry(this.id).emotions,
            editedAnguish: this.$store.getters.loadedEntry(this.id).anguish,
            editedDistortionsList: this.$store.getters.loadedEntry(this.id).distortions,
            editedThought: this.$store.getters.loadedEntry(this.id).thought,
            editedChallenge: this.$store.getters.loadedEntry(this.id).challenge,
            editedResults: this.$store.getters.loadedEntry(this.id).results,
            editedNewAnguish: this.$store.getters.loadedEntry(this.id).newAnguish,
        
            
            emotionsList: ['Agobio', 'Ansiedad', 'Culpabilidad', 'Disgusto', 'Enojo', 'Sentimiento de inutilidad', 'Miedo', 'Desesperanza', 'Tristeza', 'Vacío', 'Vergüenza', 'Tranquilidad', 'Felicidad', 'Agradecidecimiento', 'Valentía', 'Optimismo'],
            anguishList: ['0 - Sin angustia', '1 - Angustia leve', '2 - Angustia moderada', '3 - Angustia severa', '4 - Angustia extrema'],
            distortionsList: ['Saltar a conclusiones', 'Catastrofismo', 'Comparación', 'Pensamiento dicotómico', 'Descalificación de lo positivo', 'Razonamiento emocional', 'Adivinación', 'Etiquetado', 'Magnificación de lo negativo', 'Leer la mente', 'Minimización de lo positivo', 'Sobregeneralización', 'Perfeccionismo', 'Abstracción selectiva', 'Afirmaciones con "Debería"']
        }
    },
    methods: {
        onSaveChanges () {
            if (this.editedTitle === ''){
                return // No seguir si el título ahora está vacío
            }
            this.editDialog = false // Cierra el dialog
            this.$store.dispatch('updateEntryData', {
                id: this.entry.id,
                title: this.editedTitle,
                description: this.editedDescription,
                emotions: this.editedEmotionsList,
                anguish: this.editedAnguish,
                distortions: this.editedDistortionsList,
                thought: this.editedThought,
                challenge: this.editedChallenge,
                results: this.editedResults,
                newAnguish: this.editedNewAnguish,
            })
        }
    }

}
</script>
