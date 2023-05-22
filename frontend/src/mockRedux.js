function createStore(reducer){
    let state;
    let listeners = [];

    function getState(){
        return state;
    }

    function subscribe(listener){
        listeners.push(listener)
        return function unsubscribe(){
            let index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    function dispatch(action){
        //call reducer function and save whatever
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    dispatch({})

    return { dispatch, subscribe, getState }
}


//we have state and listeners
//we have 3 functions getState, dispatch and subscribe

//get state self explanatory
//dispatch adds a listener to the listeners array and
//provides a unsubscribe function to remove a listener 

//dispatch takes in an action 
//state is updated with the reducer func and takes in 
//current state + the action
//all the listeners for that store have their listener function
//called

let authStore = createStore({'func': 'reducer function'})
/*
 so now there is an auth store that can have its own state and listeners
 we have the og state probably in the reducer
 no listeners which will be listeneing to when the state changes
 we know the state changes because we will use dispact with an action

*/

//actions must be plain objects and actions
//must have a type field that is not undefined


// The core Redux createStore function itself puts only two limitations
// on how you must write your code: actions must be plain objects,
// and they must contain a defined type field. It does not care about
// immutability, serializability, or side effects, or 
// what the value of the type field actually is