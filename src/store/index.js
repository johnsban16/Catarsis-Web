import Vue from 'vue'
import Vuex from 'Vuex'

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
        user: {
            //cambiar por nombre de la base
            name: 'Esteban Castillo',
            //Cambiar por el id en la base
            id: '0000',
            //Aqui tiene que cargar las entradas
            //del diario
            Diary:['01'],
        }
    },
    mutation:{},
    actions:{},
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
        }

    }
})