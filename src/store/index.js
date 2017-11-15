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
        user: null // Default user
    },
    mutations:{
        setUser(state, payload){
            state.user = payload
        }
    },
    actions:{
        registrarUsuario({commit}, payload){
            // Método de autenticación de Firebase
            firebase.auth().createUserWithEmailAndPassword(payload.correo, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                            Diary: [] // Se crea un diario vacío
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
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
        }

    }
})