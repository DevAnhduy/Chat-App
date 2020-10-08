export default message_reducer = ( state, action ) => {
    switch (action.type) {
        case "ADD" :
            state = [...state,action.payload];
            break;
        case "LOAD" :
            break;
        case "EDIT" :
            break;
        case "DELETE" :
            break;
    }
}