/*
This is the main juice of redux
Not exactly how it works but meta level what's happenening

Short explantation:
A redux store houses state that can be accessed by any component. We have listeners that subscribe to read the state and output it.
We have have changes(actions) that are dispatched to the store and state is updated. 

Longer explanation:
We create a redux store that we wrap around our whole application. It houses state thats needed by many components and in
different places. This allows any data in the store to be accessed by whatever component needs it rather than prop drilling.

We have listeners that are our places in code where we just want to read the data. Listeners subscribe to the store and will receive any
changes that happen to the data.

The other thing we can do is dispatch actions. Actions are just javascript objects with a type field and a payload
const action = {
    type: 'add',
    payload: 'all other data sometimes an objects sometimes just an id'
}

We dispatch actions to the store and the reducer function handles the action(if it exists) and returns the new state

*/

function createStore(reducer) {
    var state;
    var listeners = []

    function getState() {
        return state
    }
    
    function subscribe(listener) {
        listeners.push(listener)
        return function unsubscribe() {
            var index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }
    
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }


    //this just sets the initial state
    dispatch({})


    //when the createStore function is called we can call all three of these functions
    return { dispatch, subscribe, getState } 
}

//reducer example
//handles actions for adding and subtracting 1
function myReducer(state, action){
    switch(action.type){
        case 'add 1':
            state++;
            break;
        case 'minus 1':
            state--;
            break;
        default:
            return state;
    }
}



