import { store } from '../store'

// Función para 
export default (to, from, next) => { // to: adonde vamos, from: de donde venimos next: función que le permite al router continuar
    if(store.getters.user) {
        next()
    }else{
        next('/Login')
    }

}