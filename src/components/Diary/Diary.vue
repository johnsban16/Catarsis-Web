<template>
    <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
            <v-toolbar flat color="blue lighten-1" dark>
          <v-toolbar-title>MI DIARIO</v-toolbar-title>
        </v-toolbar>
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

    <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog
            lazy
          > {{ props.item.date }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.date"
              single-line
              counter
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>

        <td class="text-xs-left">
          <v-edit-dialog
            @open="tmp = props.item.thought"
            @save="props.item.thought = tmp || props.item.thought"
            large
            lazy
          >
            <div>{{ props.item.thought }}</div>
            <div slot="input" class="mt-3 title">Actualizar pensamiento</div>
            <v-text-field
              slot="input"
              label="Edit"
              v-model="tmp"
              single-line
              counter
              autofocus
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        
        <td class="text-xs-left">{{ props.item.emotions }}</td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>

        <v-card-title>
            <v-spacer></v-spacer>

            <v-btn to="">
              Borrar entrada
            </v-btn>

            <v-btn to="">
              Modificar entrada
            </v-btn>

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
            text: 'Pensamiento',
            align: 'left', 
            sortable: false,
            value: 'entry' 
          },
          { 
            text: 'Emociones',
            align: 'left', 
            sortable: false,
            value: 'emotions' 
          }
        ],
        items: [
          {
            date: '02-03-17',
            thought: 'Me siento feliz porque fui a la verdulería y me compré unas pipas muy baratas.',
            emotions: 'Feliz, ilusionado, alegre'
          }
          /*
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%'
          }*/
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