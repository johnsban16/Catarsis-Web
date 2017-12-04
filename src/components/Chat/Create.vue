<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed = "onDismissed" :text ="error.message"> </app-alert>
            </v-flex>
        </v-layout> 
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                  <v-toolbar flat color="blue lighten-1" dark >
                  <v-toolbar-title>¿Desea iniciar una conversación?</v-toolbar-title></v-toolbar>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="createChat">
                              <v-layout row>
                                <v-flex xs12>
                                    <v-btn type="submit">
                                        Iniciar conversación
                                    </v-btn>
                                </v-flex>
                              </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
var year = new Date().getFullYear().toString()
var month = new Date().getMonth() + 1
month.toString()
var day = new Date().getDate().toString()
var date = "Chat " + year + "-" + month + "-" + day;
  export default {
    data () {
      return {
        chatName: date
      }
    },
    methods: {
      createChat () {
          console.log({chatName: this.chatName})
          this.$store.dispatch('createChat', { chatName: this.chatName })
          this.$router.push('/Chat/0')        
      }
    }
  }
</script>
