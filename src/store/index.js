import Vue from 'vue'
import Vuex from 'Vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedEntrys:[
            {
                id: 'id1',
                name: 'entrada',
                date: '2017-07-17'
            },
            {
                id: 'id2',
                name: 'entrada2',
                date: '2017-08-17'
            }
        ],
        user: null, // Default user
        loading: false,
        error: null
    },
    mutations:{
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
        }
    },
    actions:{
        // Crear entrada del diario
        createEntry({commit}, payload){
            
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
                            // Diary: [] // TODO: llenar el diario de pensamiento
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
        clearError({commit}){
            commit('clearError')
        }
    },
    getters:{
        loadedEntrys(state){
            return state.loadedEntrys.sort((entryA, entryB) => {
                return entryA.date > entryB.date
            })
        },
        loadedEntry(state){
            return (entryID) =>{
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
        meditationData(){
            var storageRef = firebase.storage().ref();
            var meditation = storageRef.child('Free Your Mind - Letting Go.mp3');
            return meditation
        }

    }
})