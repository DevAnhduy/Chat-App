const set_receiver = (receiver) => {
    return {
        type: "SET_RECEIVER",
        payload: receiver
    }
}

export { set_receiver }