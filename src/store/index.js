import Vue from 'vue'
import Vuex from 'Vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedEntrys: [ // Entradas de Diario que se cargan de firebase
            /*{ 
                id: 'sdf5sdf', 
                title: 'El otro día vi a una persona que hace rato no me topaba', 
                date: '13/06/2017', 
                description: 'Iba caminando por la calle y me topé a esta persona, no quería verla. Igual ahí estaba, yo no podía hacer nada al respecto. Nunca he podido. Nunca podré. La verdad es que no puedo controlar muchas cosas que me suceden, y eso no está tan mal.',
                emotions: ['Ansiedad', 'Tristeza'],
                anguish: '2 - Angustia moderada',
                distortions: ['Magnificación de lo negativo', 'Filtrando lo positivo'],
                thought: 'Siento que odio no poder controlar todo a mi alrededor.',
                challenge: 'Voy a dejar de sentirme triste.',
                results: 'Me siento menos triste.',
                newAnguish: '1 - Angustia leve',
                date: new Date()
            },
            { 
                id: 'skdjf435', 
                title: 'Me siento triste', 
                date: '12/03/2017', 
                description: 'Me sentí triste',
                emotions: ['Angustia', 'Enojo'],
                anguish: '2 - Angustia moderada',
                distortions: ['Etiquetado', 'Filtrando lo positivo'],
                thought: 'Siento que odio no poder controlar todo a mi alrededor.',
                challenge: 'Voy a dejar de querer controlarlo todo siempre.',
                results: 'Me siento mejor y más liberado.',
                newAnguish: '0 - Sin angustia',
                date: new Date()
            }
            */
        ],
        /*user: {
            id: 'kdlfjg345',
            diaryEntrys :['1, 2, 3, 4']
        }, // Default user
        */
        user: null,
        loading: false,
        error: null,
        chats: [],
        onlineUsers: []
    },
    mutations:{
        setLoadedEntrys (state, payload) {
            state.loadedEntrys = payload 
        },
        createEntry(state, payload){
            state.loadedEntrys.push(payload)
        },
        setUser(state, payload){
            state.user = payload
        },
        setLoading(state, payload){
            state.loading = payload // Payload es true o false dependiendo de si estamos loading o no
        },
        setError(state, payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        },
        setMessagesEmpty (state) {
            state.messages = []
          },
        setOnlineUsers (state, payload) {
            state.onlineUsers = payload
        },
        setChats (state, payload) {
            state.chats = payload
        }
    },
    actions:{
        loadEntrys ({commit}) { // Esto es para loadear todas las entrys, esto lo llamamos en main.js, porque ahí se carga la app
            commit('setLoading', true)
            firebase.database().ref('entrys').once('value') // fetch values, value es un event que nos da Firebase cada vez que los datos de la base cambian, en este caso solo usamos el once, porque no se necesita un live update
                .then((data) => {
                    const entrys = [] // En este array almacenamos todos los entrys que fetcheamos
                    const obj = data.val() // Objeto con pares de tipo property, value
                    for (let key in obj){ // Aquí iteramos por todas las llaves en el obj
                        entrys.push({
                            id: key,
                            title: obj[key].title,
                            date: obj[key].date, 
                            description: obj[key].description,
                            emotions: obj[key].emotions,
                            anguish: obj[key].anguish,
                            distortions: obj[key].distortions,
                            thought: obj[key].thought,
                            challenge: obj[key].challenge,
                            results: obj[key].results,
                            newAnguish: obj[key].newAnguish,
                            creatorId: obj[key].creatorId 
                        }) // Pusheamos en el array de arriba para irlo llenando de las cosas que fetcheamos de la base
                    }
                    commit('setLoadedEntrys', entrys) // Le pasamos a esta función el array que acabamos de llenar
                    commit('setLoading', false) // Aquí termina de cargar
                })
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', false)
                    }
                )
        },
        // Crear entrada del diario
        createEntry({commit, getters}, payload){
            const entry = {
                //id: payload.id, // Se remueve el id porque Firebase crea un ID único automáticamente
                title: payload.title,
                description: payload.description,
                emotions: payload.emotions,
                anguish: payload.anguish,
                distortions: payload.distortions,
                thought: payload.thought,
                challenge: payload.challenge,
                results: payload.results,
                newAnguish: payload.newAnguish,
                date: payload.date.toISOString(), // Se pasa a string para poder almacenarla en firebase
                creatorId: getters.user.id // Guarda cada entry con el id del usuario que creó la entrada de diario
            }
            // --------------- ALMACENAR EN FIREBASE --------------- 
            // Se quiere almacenar y/o accesar a los entrys del diario en la base, se pushea el entry recién creado
            firebase.database().ref('entrys').push(entry) 
                .then((data) => {
                    //console.log(data);
                    const key = data.key // Almacenamos la key del entry
                    commit('createEntry',  {
                        ...entry, // con ... obtenemos el objeto de arriba de entry
                        id: key // estamos asignándole el key de firebase al objeto entry
                    })
                }) // En caso de success, muestra en consola y hace commit
                .catch((error) => {
                    console.log(error)
                }) // En caso de fallo
            
        },
        registrarUsuario({commit}, payload){
            // Método de autenticación de Firebase
            // Mientras registramos un usuario estamos en estado de loading
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.correo, payload.password)
                .then(
                    user => {
                        // Una vez que se tiene un usuario, ya no se está cargando
                        commit('setLoading', false)                        
                        const newUser = {
                            id: user.uid,
                            Diary: [] // Se crea un diario vacío
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)     
                        commit('setError', error)                        
                        console.log(error)
                    }
                )
        },
        iniciarSesionUsuario({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.correo, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)                                                
                        const newUser = {
                            id: user.uid,
                            Diary: [] // TODO: llenar el diario de pensamiento
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch( // Handle errors
                    error => {
                        commit('setLoading', false)     
                        commit('setError', error)                                                
                        console.log(error)
                    }
                )
        },
        sendMessage ({commit}, payload) {
            let chatID = payload.chatID
            const message = {
              user: payload.username,
              content: payload.content,
              date: payload.date
            }
            firebase.database().ref('messages').child(chatID).child('messages').push(message)
              .then(
                (data) => {
                }
              )
              .catch(
                (error) => {
                  console.log(error)
                }
              )
          },
        createChat ({commit}, payload) {
            var newPostKey = firebase.database().ref().child('chats').push().key
            var updates = {}
            updates['/chats/' + newPostKey] = {name: payload.chatName}
            firebase.database().ref().update(updates)
        },
        loadChats ({commit}) {
            firebase.database().ref('chats').on('value', function (snapshot) {
              commit('setChats', snapshot.val())
            })
        },
        loadOnlineUsers ({commit}) {
            firebase.database().ref('users').on('value', function (snapshot) {
              let result = []
              result[0] = snapshot.numChildren()
              result[1] = snapshot.val()
              commit('setOnlineUsers', result)
            })
        },
        autoSignIn ({commit}, payload){ // El payload es el user
            commit('setUser', {id: payload.uid, Diary: []})
        },
        logout({commit}) {
            firebase.auth().signOut() // Este método remueve el token del local storage
            commit('setUser', null) // Pone el user en null para sign out
        },
        clearError({commit}){
            commit('clearError')
        }

    },
    getters: {
        // Devolver todas las entrys del diario
        loadedEntrys(state){
            return state.loadedEntrys.sort((entryA, entryB) => {
                return entryA.date < entryB.date
            })
        },
        loadedEntry(state) {
            return (entryID) => {
                return state.loadedEntrys.find((entry) => {
                    return entry.id === entryID
                })
            }
        },
        user(state){
            return state.user
        },
        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        },
        messages (state) {
            return state.messages
        },
        chats (state) {
            return state.chats
        }
    }
})