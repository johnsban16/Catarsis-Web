<template>
    <v-container>
      <v-layout column>
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
                        <v-card-text class="grey lighten-3">{{entry.date}}</v-card-text>
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
                        <v-card-text class="grey lighten-3">{{entry.emotions}}</v-card-text>
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
                        <v-card-text class="grey lighten-3">{{entry.distortions}}</v-card-text>
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
        }
    }

}
</script>
