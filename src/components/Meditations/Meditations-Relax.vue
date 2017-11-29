<template>
<v-container>
        <v-layout row wrap>
            <v-flex xs12 md6 lg10 offset-sm1>
                <v-expansion-panel>
                    <v-toolbar color="primary">
      <v-toolbar-title class="white--text">Meditaciones para reducir el estrés</v-toolbar-title>
    </v-toolbar>
                    <v-expansion-panel-content v-for="item in relaxMeditations" :key="item.title">
                    <div slot="header">{{item.title}}</div>
                    <v-card>
                       <a-player theme='#1E88E5'  :music="{
                        title: item.title,
                        author: item.author,
                        url: item.url,
                        pic: item.pic }">
                    </a-player>
                    </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
</v-container>
</template>
<script>
    export default{
        data(){
            return{
                relaxMeditations:[
                    {title: 'Free your mind', author: 'Catarsis', 
                    url: 'https://firebasestorage.googleapis.com/v0/b/catarsis-cr.appspot.com/o/Meditations%2FRelaxation%2FFree%20Your%20Mind%20.mp3?alt=media&token=9be78a1c-20e4-437c-b1ff-4768920f06e2', 
                    pic: 'https://firebasestorage.googleapis.com/v0/b/catarsis-cr.appspot.com/o/MeditationsPics%2Frelax.jpg?alt=media&token=84acf8e1-0a56-45e9-b655-1fecd67c70d2' },
                    {title: 'Fuck That', author: 'Jason Headley',
                    url: 'https://firebasestorage.googleapis.com/v0/b/catarsis-cr.appspot.com/o/Meditations%2FRelaxation%2FFck%20That.mp3?alt=media&token=e82314c2-8916-40e2-9419-539cc8363004',
                    pic: 'https://firebasestorage.googleapis.com/v0/b/catarsis-cr.appspot.com/o/MeditationsPics%2Frelax.jpg?alt=media&token=84acf8e1-0a56-45e9-b655-1fecd67c70d2' }
                ], 
            } 
        },
    }
</script>