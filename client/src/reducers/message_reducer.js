const INIT_STATE = [];
const message_reducer = ( state = INIT_STATE, action ) => {
    switch (action.type) {
        case "SET_MESSAGES" : 
            return state = [...action.payload];
        case "ADD_MESSAGE" :
            console.log("Send message")
            return state = [...state,action.payload];
        case "EDIT_MESSAGE" :
            break;
        case "DELETE_MESSAGE" :
            break;
    }
    return state;
}

export default message_reducer;