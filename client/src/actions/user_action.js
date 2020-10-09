const set_user = (user) => {
    return {
        type : "SET_USER",
        payload: user
    }
}

export { set_user }