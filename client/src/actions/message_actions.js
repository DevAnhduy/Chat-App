const set_messages = (messages) => {
    return {
        type : "SET",
        payload : messages
    }
}

const add_message = (message) => {
    return {
        type : "ADD",
        payload: message
    }
}

const edit_message = (message) => {
    return {
        type : "EDIT",
        payload: message
    }
}

const delete_message = (message) => {
    return {
        type : "DELETE",
        payload: message
    }
}

export { set_messages,add_message,edit_message,delete_message }