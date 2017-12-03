<template>
  <v-app>
    <link rel="shortcut icon" type="image/png" href="/static/favicon.png"/>
    <v-navigation-drawer temporary light v-model="sideNav">
    <v-toolbar color="blue lighten-1" flat>
      <v-list>
        <v-list-tile >
          <v-list-tile-title class="title">
            Catarsis
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile v-for="item in menuItems" 
                  :key="item.title"
                  :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- LOGOUT -->
      <v-list-tile 
      v-if="userIsAuthenticated"
      @click="onLogout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Cerrar sesión</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
    <v-toolbar color="blue darken-1" dark >
      <v-toolbar-side-icon 
      @click.stop="sideNav = !sideNav"
      class = "hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          Catarsis  
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
          <v-btn flat v-for="item in menuItems" 
                :key="item.title"
                :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <!-- Botón de logout (responsive menu)-->
          <v-btn 
            v-if="userIsAuthenticated"
            flat
            @click="onLogout">
            <v-icon left>exit_to_app</v-icon>
            Cerrar sesión
          </v-btn>

      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>© {{ new Date().getFullYear() }}</div>
  </v-footer>
  </v-app>
</template>

<script>
  export default {
    data (){
      return{
        sideNav: false
      }
    },
    computed: { // Esto depende de la autenticación del usuario, cambia el menú según si estoy loggeado o no
      menuItems(){ 
        let menuItems = [ // Menú default para la gente no loggeada
          {icon: 'lock_open', title: 'Iniciar sesión', link:'/Login'},
          {icon: 'account_circle', title: 'Registrarse', link:'/Signup'}
        ]
        if(this.userIsAuthenticated){ // Si el usuario está signeado, devolver todo menos registrarse y login más un logout
          menuItems = [
            {icon: 'account_circle', title: 'Mi perfil', link:'/Profile'},
            {icon: 'question_answer', title: 'Iniciar conversación', link:'/Chat'},
            {icon: 'accessibility', title: 'Meditaciones guiadas', link:'/Meditations' },
            {icon: 'developer_board', title: 'Diario de pensamiento', link:'/Diary'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated(){ // Función que devuelve si usuario está autenticado
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout') // Cuando se presiona el botón de logout se llama al método de store, logout
        this.$router.push('/') // Cuando el usuario hace signout, regresa a la raíz
      }
    }
  }

</script>
