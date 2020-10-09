const INIT_STATE = {} ;

const receiver_reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case "SET_RECEIVER" :
            return state = {...action.payload};
    }
    return state;
}

export default receiver_reducer;