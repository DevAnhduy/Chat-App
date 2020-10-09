const INIT_STATE = [];
const message_reducer = ( state = INIT_STATE, action ) => {
    switch (action.type) {
        case "SET" : 
            return state = [...action.payload];
        case "ADD" :
            console.log("Send message")
            return state = [...state,action.payload];
        case "EDIT" :
            break;
        case "DELETE" :
            break;
    }
    return state;
}

export default message_reducer;