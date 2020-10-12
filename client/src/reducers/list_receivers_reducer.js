const INIT_STATE = {};

const list_receivers_reducer = ( state = INIT_STATE, action ) => {
    console.log(action.payload)
    switch (action.type) {
        case "SET_LIST_RECEIVER" : 
            return {
                ...state,
                ...action.payload
            };
    }
    return state;
}

export default list_receivers_reducer;