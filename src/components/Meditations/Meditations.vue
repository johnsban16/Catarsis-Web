<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 md6 lg10 offset-sm1>
                <v-card>
                    <v-container fluid >
                        <v-layout row wrap>
                            <v-flex
                            xs12 md4 lg4
                            v-for="item in meditationTypes" 
                            :key="item.type"
                            >
                                <v-card flat tile>
                                    <v-card-media
                                    :src="item.pic"
                                    height="200px"
                                    >
                                        <v-container fill-height fluid>
                                            <v-layout fill-height>
                                                <v-flex xs12 align-end flexbox>
                                                    <span class='headline white--text' v-text="item.type"></span>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-media>
                                    <v-card-actions>
                                        <v-btn flat :to="item.link">Ver</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
 <script>
    export default{
        data(){
            return{
                meditationTypes:[
                    {type: 'Manejar estrés', link: '/Meditations/Relax', pic: 'https://firebasestorage.googleapis.com/v0/b/catarsis-cr.appspot.com/o/MeditationsPics%2Frelax.jpg?alt=media&token=84acf8e1-0a56-45e9-b655-1fecd67c70d2'},
                    {type: 'Insomnio', link:'',  pic: 'https://firebasestorage.googleapis.com/v0/b/catarsis-cr.appspot.com/o/MeditationsPics%2Finsomnia.jpg?alt=media&token=299130fe-e49f-41a4-8007-c546e5ddbd86'},
                    {type: 'Amor propio',link:'', pic: 'https://firebasestorage.googleapis.com/v0/b/catarsis-cr.appspot.com/o/MeditationsPics%2FselfLove.jpg?alt=media&token=a029fe20-7fea-46c0-9d05-b4b5f0c25bcd'}
                ]
            } 
        },
        computed:{
            //Retorna los datos de una meditacion
            meditationData(){
                console.log(this.$store.getters.meditationData)
                return this.$store.getters.meditationData
            }
        }
    }
</script>