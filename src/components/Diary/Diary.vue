<template>
    <v-container>
      <v-layout column >
        <v-flex xs12>
          <!-- HEADER -->
          <v-card>
            <v-toolbar flat color="blue lighten-1" dark>
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
                xs4
              >
                <v-card>
                  <!--
                  <v-card-media
                    :src="card.src"
                    height="200px"
                  >
                  -->

                  <!-- Título --> 
                  <v-card-title primary-title>
                  <div>
                  <h3 class="headline mb-0" v-text="card.title"></h3>
                  </div>
                  </v-card-title>

                  <!-- Contenido -->
                  <v-card-text>
                    Contenido del pensamiento (TODO: bindear a la variable)
                  </v-card-text>

                  <!-- Opciones -->
                  <v-card-actions class="white">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary">Ver</v-btn>
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
        headers: [
          {
            text: 'Fecha',
            align: 'left',
            sortable: true,
            value: 'date'
          },
          { 
            text: 'Situación',
            align: 'left', 
            sortable: false,
            value: 'situation' 
          }
        ],
        cards: [
        { title: 'Me sentí triste', flex: 4 },
        { title: 'Me sentí feliz', flex: 4 },
        { title: 'Me sentí confundido', flex: 4 }
      ]
        
      }
    },
    computed:{
    entrys() {
      return this.$store.getters.loadedEntrys
    }
  }
  }
</script>