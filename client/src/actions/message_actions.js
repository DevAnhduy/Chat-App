const set_messages = (messages) => {
    return {
        type: "SET_MESSAGES",
        payload : messages
    }
}

const add_message = (message) => {
    return {
        type: "ADD_MESSAGE",
        payload: message
    }
}

const edit_message = (message) => {
    return {
        type: "EDIT_MESSAGE",
        payload: message
    }
}

const delete_message = (message) => {
    return {
        type: "DELETE_MESSAGE",
        payload: message
    }
}

export { set_messages,add_message,edit_message,delete_message }