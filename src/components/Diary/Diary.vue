<template>
    <v-container>
      <v-layout column >
        <v-flex xs12>
          <!-- HEADER -->
          <v-card>

            <v-toolbar flat color="blue lighten-1" dark >
            <v-toolbar-title>Diario de pensamiento</v-toolbar-title></v-toolbar>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>

            <!-- PENSAMIENTOS -->

            <v-container fluid grid-list-md class="grey lighten-4">
              <v-layout row wrap>
              <!-- Itera sobre la lista de pensamientos del usuario -->

              <!-- Bindear la variable al flex
              <v-flex
                v-bind="{ [`xs${card.flex}`]: true }"
                v-for="card in cards"
                :key="card.title"
              >
              -->

              <v-flex
                v-for="entry in entrys"
                :key="entry.title"
                :id="entry.id"
                xs12
              >
                <v-card>
                  <!-- Título --> 
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0" v-text="entry.title"></h3>
                      <!-- Fecha -->
                      <div>
                        <span class="grey--text" v-text="entry.date"></span><br>
                      </div>
                    </div>
                  </v-card-title>

                  <!-- Contenido -->
                  <v-card-text>
                    <!-- Texto -->
                    <div>{{entry.description}}</div>
                  </v-card-text>

                  <!-- Opciones -->
                  <v-card-actions class="white">
                    <v-spacer></v-spacer>
                    <!-- <v-btn flat color="primary" :to="'/Entry/' + entry.id">Ver</v-btn> -->
                    <v-btn flat color="primary" @click = "onLoadEntry(entry.id)">Ver</v-btn>
                    <v-btn flat color="primary">Editar</v-btn>
                    <v-btn flat color="primary">Borrar</v-btn>
                  </v-card-actions>

                </v-card>
              </v-flex>
              </v-layout>
            </v-container>

            <!-- FOOTER (AGREGAR ENTRADA)-->
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn to="/Entry/new">
                Agregar entrada
              </v-btn>

            </v-card-title>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
      }
    },
    methods: {  
      onLoadEntry(id){
        this.$router.push('/Entry/' + id)
      }
    },
    // Computed siempre nos da el state más reciente
    computed:{
      entrys() {
        return this.$store.getters.loadedEntrys // Me devuelve las entrys actuales del store
      },
      entryPrueba() {
        return this.$store.getters.loadedEntry('2')
      }
  }
}
</script>