import Vue from 'vue'
import Vuex from 'Vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedEntrys: [ // Entradas de Diario que se cargan de firebase
            { 
                id: 'abc123', 
                title: 'Me siento triste', 
                date: new Date(),
                description: 'Es me siento triste porque blablablalbablablab y blablablalbalblabal'
            },
            { 
                id: 'df2sdf', 
                title: 'Me siento feliz', 
                date: new Date(),
                description: 'Located two hours south of Sydney in the Southern Highlands of New South Wales, ...' 
            },
            { 
                id: 'df34sdfs', 
                title: 'Me siento confundido', 
                date: new Date(),
                description: 'Hola' },
            { 
                id: 'df4sdfsdf', 
                title: 'Me siento hambriento', 
                date: new Date(), 
                description: 'Hola' 
            },
            { 
                id: 'sdf5sdf', 
                title: 'El otro día vi a una persona que hace rato no me topaba', 
                date: '13/06/2017', 
                description: 'Iba caminando por la calle y me topé a esta persona, no quería verla. Igual ahí estaba, yo no podía hacer nada al respecto. Nunca he podido. Nunca podré. La verdad es que no puedo controlar muchas cosas que me suceden, y eso no está tan mal.',
                emotions: 'Ansiedad, Tristeza',
                anguish: '2 - Angustia moderada',
                distortions: 'Magnificación de lo negativo, Filtrando lo positivo',
                thought: 'Siento que odio no poder controlar todo a mi alrededor.',
                challenge: 'Voy a dejar de querer controlarlo todo siempre.',
                results: 'Me siento mejor y más liberado.',
                newAnguish: '0 - Sin angustia',
                date: new Date()
            }
        ],
        /*user: {
            id: 'kdlfjg345',
            diaryEntrys :['1, 2, 3, 4']
        }, // Default user
        */
        user: null,
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
            const entry = {
                id: payload.id,
                title: payload.title,
                description: payload.description,
                emotions: payload.emotions,
                anguish: payload.anguish,
                distortions: payload.distortions,
                thought: payload.thought,
                challenge: payload.challenge,
                results: payload.results,
                newAnguish: payload.newAnguish,
                date: payload.date
            }
            // TODO: Ir a firebase y almacenarla en la base
            commit('createEntry',  entry)
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
        }
    }
})