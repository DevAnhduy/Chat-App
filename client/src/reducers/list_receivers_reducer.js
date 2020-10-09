const INIT_STATE = {};

const list_receivers_reducer = ( state = INIT_STATE, action ) => {
    switch (action.type) {
        case "SET_LIST_RECEIVER" : 
            return state = {...action.payload};
    }
    return state;
}

export default list_receivers_reducer;