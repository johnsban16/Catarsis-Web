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
                v-for="card in cards"
                :key="card.title"
                :id="card.id"
                @click="onLoadEntry(card.id)"  
                xs12
              >
                <v-card>
                  <!-- Título --> 
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0" v-text="card.title"></h3>
                    </div>
                  </v-card-title>

                  <!-- Contenido -->
                  <v-card-text>
                    <!-- Fecha -->
                    <div>
                      <span class="grey--text" v-text="card.date"></span><br>
                    </div>
                    <!-- Texto -->
                    <div v-text ="card.text"></div>
                  </v-card-text>

                  <!-- Opciones -->
                  <v-card-actions class="white">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" to="Entry/"card.id>Ver</v-btn>
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
        cards: [
          { id: 1, title: 'Me siento triste', date: '10/05/2017', text: 'Es me siento triste porque blablablalbablablab y blablablalbalblabal' },
          { id: 2, title: 'Me siento feliz', date: '16/07/2017', text: 'Located two hours south of Sydney in the Southern Highlands of New South Wales, ...' },
          { id: 3, title: 'Me siento confundido', date: '13/06/2017', text: 'Hola' },
          { id: 4, title: 'Me siento hambriendo', date: '13/06/2017', text: 'Hola' },
        ],
        items: [
          {
            date: '02-03-17',
            thought: 'Me siento feliz porque fui a la verdulería y me compré unas pipas muy baratas.',
            emotions: 'Feliz, ilusionado, alegre'
          }]
      }
    },
    methods: {  
      onLoadEntry(id){
        this.$router.push('/Entry/' + id)
      }
    },
    computed:{
    entrys() {
      return this.$store.getters.loadedEntrys
    }
  }
  }
</script>