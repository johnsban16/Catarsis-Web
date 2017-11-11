<template>
  <v-app>
    <link rel="shortcut icon" type="image/png" href="/static/favicon.png"/>
    <v-navigation-drawer temporary light v-model="sideNav">
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
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
                  router
                  :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
    <v-toolbar color="blue darken-1" dark >
      <v-toolbar-side-icon 
      @click.native.stop="sideNav = !sideNav"
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
                router
                :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data (){
      return{
        sideNav: false,
        menuItems: [
          {icon: 'question_answer', title: 'Iniciar conversación', link:'/Chat'},
          {icon: 'accessibility', title: 'Meditaciones guiadas', link:'/Meditations' },
          {icon: 'developer_board', title: 'Diario de pensamiento', link:'/Diary'},
          {icon: 'account_circle', title: 'Iniciar sesión', link:'/Login'}
        ]
      }
    }
  }

</script>
