const set_list_receivers = (list_receivers) => {
    console.log(list_receivers)
    return {
        type : "SET_LIST_RECEIVER",
        payload: list_receivers
    }
}

export { set_list_receivers }