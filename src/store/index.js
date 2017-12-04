import Vue from 'vue'
import Vuex from 'Vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedEntrys: [],
        /*user: {
            id: 'kdlfjg345',
            diaryEntrys :['1, 2, 3, 4']
        }, // Default user
        */
        user: null,
        loadedMeditationsRelax: [],
        loading: false,
        error: null,
        chats: [],
        onlineUsers: []
    },
    mutations:{
        setLoadedEntrys (state, payload) {
            state.loadedEntrys = payload 
        },
        setLoadedMeditationsRelax (state, payload) {
            state.loadedMeditationsRelax = payload
        },
        createEntry(state, payload){
            state.loadedEntrys.push(payload)
        },
        createUser(state, payload){},
        deleteEntry(state, payload){ // Delete entry del array actual de entrys
            var index = state.loadedEntrys.indexOf(payload.id)
            console.log(index)
            state.loadedEntrys.splice(index, 1)
        },
        updateEntry (state, payload) { // El payload es el nuevo data del entry
            const entry = state.loadedEntrys.find(entry => {
                return entry.id === payload.id // Aquí devuelve el id de la entry que fue modificada
            })

            if (payload.title) {
                entry.title = payload.title
            }

            entry.description = payload.description
            entry.emotions = payload.emotions
            entry.anguish = payload.anguish
            entry.distortions = payload.distortions
            entry.thought = payload.thought
            entry.challenge = payload.challenge
            entry.results = payload.results
            entry.newAnguish = payload.newAnguish
            
            /*
            if (payload.description) {
                entry.description = payload.description
            }
            if (payload.emotions) {
                entry.emotions = payload.emotions
            }
            if (payload.anguish) {
                entry.anguish = payload.anguish
            }
            if (payload.distortions) {
                entry.distortions = payload.distortions
            }
            if (payload.thought) {
                entry.thought = payload.thought
            }
            if (payload.challenge) {
                entry.challenge = payload.challenge
            }
            if (payload.results) {
                entry.results = payload.results
            }
            if (payload.newAnguish) {
                entry.newAnguish = payload.newAnguish
            }
            */

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
        loadEntrys ({commit, getters}) { // Esto es para loadear todas las entrys, esto lo llamamos en main.js, porque ahí se carga la app
            commit('setLoading', true)
            firebase.database().ref('entrys').once('value') // fetch values, value es un event que nos da Firebase cada vez que los datos de la base cambian, en este caso solo usamos el once, porque no se necesita un live update
                .then((data) => {
                    const entrys = [] // En este array almacenamos todos los entrys que fetcheamos
                    const obj = data.val() // Objeto con pares de tipo property, value
                    for (let key in obj){ // Aquí iteramos por todas las llaves en el obj
                        // Llena el array con las entradas específicas del usuario
                        if(obj[key].creatorId == getters.user.id){
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
                            console.log(obj[key].date)
                        }   
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
        loadMeditationsRelax ({commit, getters}) { // Esto es para loadear todas las entrys, esto lo llamamos en main.js, porque ahí se carga la app
            commit('setLoading', true)
            firebase.database().ref('meditations/relax').once('value') // fetch values, value es un event que nos da Firebase cada vez que los datos de la base cambian, en este caso solo usamos el once, porque no se necesita un live update
                .then((data) => {
                    const meditationsRelax = [] // En este array almacenamos todos los entrys que fetcheamos
                    const obj = data.val() // Objeto con pares de tipo property, value
                    for (let key in obj){ // Aquí iteramos por todas las llaves en el obj
                        // Llena el array de meditaciones
                        console.log(obj[key].title)
                        console.log(obj[key].author)
                        console.log(obj[key].url)
                        console.log(obj[key].pic)
                        meditationsRelax.push({
                            title: obj[key].title,
                            author: obj[key].author,
                            url: obj[key].url,
                            pic: obj[key].pic
                        }) // Pusheamos en el array de arriba para irlo llenando de las cosas que fetcheamos de la base
                        console.log(obj[key].title)
                    }
                    commit('setLoadedMeditationsRelax', meditationsRelax) // Le pasamos a esta función el array que acabamos de llenar
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
        registrarUsuario({commit, getters}, payload){ // Cuando hace esto mete el usuario a la base también
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
                            nombre: payload.nombre,
                            tipo: 'standard',
                            Diary: [] // Se crea un diario vacío
                        }
                        commit('setUser', newUser)

                        // --------------- ALMACENAR USUARIO EN FIREBASE ---------------
                        // Se quiere almacenar y/o accesar a los entrys del diario en la base, se pushea el entry recién creado
                        firebase.database().ref('users').push(newUser) 
                        .then((data) => {
                            //console.log(data);
                            //const key = data.key // Almacenamos la key del user
                            
                            commit('createUser',  {newUser})
                        }) // En caso de success, muestra en consola y hace commit
                        .catch((error) => {
                            console.log(error)
                        }) // En caso de fallo
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
                            Diary: []
                        }
                        commit('setUser', newUser)
                        // (?)
                        
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
            commit('setLoadedEntrys', []) // Para que cuando salga, deje las loaded entrys vacías
        },
        clearError({commit}){
            commit('clearError')
        },
        deleteEntry ({commit}, payload) {
            commit('setLoading', false)
            firebase.database().ref('entrys').child(payload.id).remove() 
            .then(() =>{
                commit('setLoading', false)
                commit('deleteEntry', payload)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        updateEntryData ({commit}, payload) {

            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }

            updateObj.description = payload.description
            updateObj.emotions = payload.emotions
            updateObj.anguish = payload.anguish
            updateObj.distortions = payload.distortions
            updateObj.thought = payload.thought
            updateObj.challenge = payload.challenge
            updateObj.results = payload.results
            updateObj.newAnguish = payload.newAnguish

            /*
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.emotions) {
                updateObj.emotions = payload.emotions
            }
            if (payload.anguish) {
                updateObj.anguish = payload.anguish
            }
            if (payload.distortions) {
                updateObj.distortions = payload.distortions
            }
            if (payload.thought) {
                updateObj.thought = payload.thought
            }
            if (payload.challenge) {
                updateObj.challenge = payload.challenge
            }
            if (payload.results) {
                updateObj.results = payload.results
            }
            if (payload.newAnguish) {
                updateObj.newAnguish = payload.newAnguish
            }
            */


            // Modificar en la base
            firebase.database().ref('entrys').child(payload.id).update(updateObj) // Solo reemplaza los elementos del entry que estén en el updateObj
                .then(() =>{
                    commit('setLoading', false)
                    commit('updateEntry', payload)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        }

    },
    getters: {
        // Devolver todas las entrys del diario
        loadedEntrys (state){
            return state.loadedEntrys.sort((entryA, entryB) => {
                return entryA.date < entryB.date
            })
        },
        loadedEntry ({commit}, state) {
            return (entryID) => {
                return state.loadedEntrys.find((entry) => {
                    return entry.id === entryID
                })
            }
        },
        user(state){
            return state.user
        },
        loadedMeditationsRelax(state){
            return state.loadedMeditationsRelax
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