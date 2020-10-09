const INIT_STATE = null;
const user_reducer = (state = INIT_STATE,action ) => {
    switch(action.type) {
        case "SET_USER" : 
            console.log("CHeck")
            return {...action.payload}
    }
    return state;
}

export default user_reducer;