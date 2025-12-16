class User {
    static #latestUserId = 3
    static #data = [
        {
            id: "1",
            email: "a@a.a",
            password: "Aa@12345",
            role: "ADMIN"
        },
        {
            id: "2",
            email: "b@b.b",
            password: "Bb@12345",
            role: "BUYER"
        },
        {
            id: "3",
            email: "s@s.s",
            password: "Ss@12345",
            role: "SELLER"
        }
    ]

    getAll() {
        return User.#data ?? []
    }
    getById(id) {
        return User.#data.find(item => {
            if(item.id === id) {
                return item
            }
        }) ?? null
    }
    getByEmail(email) {
        return User.#data.find(item => {
            if(item.email === email) {
                return item
            }
        }) ?? null
    }
    add(user) {
        const newUser = {
            id: (++User.#latestUserId).toString(),
            ...user
        }
        User.#data.push(newUser)
        return newUser
    }
}

export default User
