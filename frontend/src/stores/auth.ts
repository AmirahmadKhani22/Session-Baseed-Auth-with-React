/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand"

type User = {
    email: string;
    role: "ADMIN" | "BUYER" | "SELLER";
}

type States = {
    user: User | null;
    status: "authorized" | "unauthorized" | "none";
    isGettingUser:  boolean;
    isRegisteringUser: boolean;
    isLoggingInUser: boolean;
    isLoggingOutUser: boolean;
}

type Actions = {
    setUser: (user: User) => void;
    removeUser: () => void;
    setisGettingUser: (isGettingUser: States['isGettingUser']) => void;
    setIsRegisteringUser: (isLoggingInUser: States['isRegisteringUser']) => void;
    setIsLoggingInUser: (isLoggingInUser: States['isLoggingInUser']) => void;
    setIsLoggingOutUser: (isLoggingOutUser: States['isLoggingOutUser']) => void;
    loginUser: ({
        loginData,
        onSuccess, 
        onError, 
        externalController
    } : {
        loginData: string,
        onSuccess?: (data: any) => void, 
        onError?: (error: Error) => void, 
        externalController?: AbortController
    }) => void;
    registerUser: ({
        registerData,
        onSuccess, 
        onError, 
        externalController
    } : {
        registerData: string,
        onSuccess?: (data: any) => void, 
        onError?: (error: Error) => void, 
        externalController?: AbortController
    }) => void;
    getUser: ({
        onSuccess,
        onError,
        externalController
    }: {
        onSuccess?: (data: any) => void;
        onError?: (error: Error) => void;
        externalController?: AbortController
    }) => void;
    logoutUser: ({
        onSuccess,
        onError,
        externalController
    }: {
        onSuccess?: (data: any) => void;
        onError?: (error: Error) => void;
        externalController?: AbortController
    }) => void;
    resetAuthStates: () => void;
}

const useAuthStore = create<States & Actions>((set , get , store) => {
    return {
        user: null,
        status: "none",
        isGettingUser: false,
        isRegisteringUser: false,
        isLoggingInUser: false,
        isLoggingOutUser: false,
        setUser(user) {
            if(!user) { // validate user
                throw new Error(
                    "the user data is not valid for setting!",
                    {cause: {
                        type: "UNEXPECTED_CLIENT_ERROR",
                    }}
                )
            }
            set({user: {...user} , status: "authorized"})
        },
        removeUser() {
            set({user: null , status: "unauthorized"})
        },
        setisGettingUser(isGettingUser) {
            set({isGettingUser})
        },
        setIsRegisteringUser(isRegisteringUser) {
            set({isRegisteringUser})
        },
        setIsLoggingInUser(isLoggingInUser) {
            set({isLoggingInUser})
        },
        setIsLoggingOutUser(isLoggingOutUser) {
            set({isLoggingOutUser})
        },
        registerUser({registerData , onSuccess , onError , externalController}) {
            const {setIsLoggingInUser , setUser , removeUser} = get()
            setIsLoggingInUser(true);
            (async function () {
                const controller = new AbortController()
                externalController?.signal.addEventListener("abort" , () => {
                    controller.abort()
                })
                const timeoutId = setTimeout(() => {
                    if(!controller.signal.aborted) {
                        controller.abort()
                    }
                    clearTimeout(timeoutId)
                }, 7000)
                try {
                    const res = await fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: registerData,
                            signal: controller.signal
                        }
                    )
                    const data = await res.json()
                    if(!res.ok) {
                        if(res.status >= 400 && res.status < 500) {
                            throw new Error(
                                data.error.message,
                                {cause: {
                                    statusCode: res.status,
                                    type: data.error.type
                                }}
                            )
                        }
                        if(res.status >= 500) {
                            throw new Error(
                                data.error.message,
                                {cause: {
                                    statusCode: res.status,
                                    type: data.error.type
                                }}
                            )
                        }
                    } else {
                        clearTimeout(timeoutId)
                        setUser(data.data)
                        setIsLoggingInUser(false)
                        if(onSuccess) {
                            onSuccess(data)
                        }
                    }
                    return 
                } catch(error) {
                    if(error instanceof Error) {
                        clearTimeout(timeoutId)
                        removeUser()
                        setIsLoggingInUser(false)
                        if(onError) {
                            if(!error.cause) {
                                error.cause = {
                                    statusCode: 500,
                                    type: "CONNECTION_ERROR"
                                }
                            }
                            onError(error)
                        }
                    }
                }
            })()
        },
        loginUser({loginData , onSuccess , onError , externalController}) {
            const {setIsLoggingInUser , setUser , removeUser} = get()
            setIsLoggingInUser(true);
            (async function () {
                const controller = new AbortController()
                externalController?.signal.addEventListener("abort" , () => {
                    controller.abort()
                })
                const timeoutId = setTimeout(() => {
                    if(!controller.signal.aborted) {
                        controller.abort()
                    }
                    clearTimeout(timeoutId)
                }, 7000)
                try {
                    const res = await fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: loginData,
                            signal: controller.signal
                        }
                    )
                    const data = await res.json()
                    if(!res.ok) {
                        if(res.status >= 400 && res.status < 500) {
                            throw new Error(
                                data.error.message,
                                {cause: {
                                    statusCode: res.status,
                                    type: data.error.type
                                }}
                            )
                        }
                        if(res.status >= 500) {
                            throw new Error(
                                data.error.message,
                                {cause: {
                                    statusCode: res.status,
                                    type: data.error.type
                                }}
                            )
                        }
                    } else {
                        clearTimeout(timeoutId)
                        setUser(data.data)
                        setIsLoggingInUser(false)
                        if(onSuccess) {
                            onSuccess(data)
                        }
                    }
                    return 
                } catch(error) {
                    if(error instanceof Error) {
                        clearTimeout(timeoutId)
                        removeUser()
                        setIsLoggingInUser(false)
                        if(onError) {
                            if(!error.cause) {
                                error.cause = {
                                    statusCode: 500,
                                    type: "CONNECTION_ERROR"
                                }
                            }
                            onError(error)
                        }
                    }
                }
            })()
        },
        getUser({onSuccess , onError , externalController}) {
            const {setisGettingUser , setUser , removeUser} = get()
            setisGettingUser(true);
            (async function () {
                const controller = new AbortController()
                externalController?.signal.addEventListener("abort" , () => {
                    controller.abort()
                })
                const timeoutId = setTimeout(() => {
                    if(!controller.signal.aborted) {
                        controller.abort()
                    }
                    clearTimeout(timeoutId)
                }, 20100) // test
                try {
                    const res = await fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/user`,
                        {
                            method: "GET",
                            credentials: "include",
                            signal: controller.signal
                        }
                    )
                    const data = await res.json()
                    if(!res.ok) {
                        if(res.status >= 400 && res.status < 500) {
                            throw new Error(
                                data.error.message,
                                {cause: {
                                    statusCode: res.status,
                                    type: data.error.type
                                }}
                            )
                        }
                        if(res.status >= 500) {
                            throw new Error(
                                data.error.message,
                                {cause: {
                                    statusCode: res.status,
                                    type: data.error.type
                                }}
                            )
                        }
                    } else {
                        clearTimeout(timeoutId)
                        setUser(data.data)
                        setisGettingUser(false)
                        if(onSuccess) {
                            onSuccess(data)
                        }
                    }
                    return 
                } catch(error) {
                    if(error instanceof Error) {
                        clearTimeout(timeoutId)
                        removeUser()
                        setisGettingUser(false)
                        if(onError) {
                            if(!error.cause) {
                                error.cause= {
                                    statusCode: 500,
                                    type: "CONNECTION_ERROR"
                                }
                            }
                            onError(error)
                        }
                    }
                }
            })()
        },
        logoutUser({onSuccess , onError , externalController}) {
            const {setIsLoggingOutUser , removeUser} = get()
            setIsLoggingOutUser(true);
            (async function () {
                const controller = new AbortController()
                externalController?.signal.addEventListener("abort" , () => {
                    controller.abort()
                })
                const timeoutId = setTimeout(() => {
                    if(!controller.signal.aborted) {
                        controller.abort()
                    }
                    clearTimeout(timeoutId)
                }, 7000)
                try {
                    const res = await fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
                        {
                            method: "GET",
                            credentials: "include",
                            signal: controller.signal
                        }
                    )
                    const data = await res.json()
                    if(!res.ok) {
                        if(res.status >= 400 && res.status < 500) {
                            throw new Error(
                                data.error.message,
                                {cause: {
                                    statusCode: res.status,
                                    type: data.error.type
                                }}
                            )
                        } 
                        if(res.status > 500) {
                            throw new Error(
                                data.error.message,
                                {cause: {
                                    statusCode: res.status,
                                    type: data.error.type
                                }}
                            )
                        }
                    } else {
                        clearTimeout(timeoutId)
                        removeUser()
                        setIsLoggingOutUser(false)
                        if(onSuccess) {
                            onSuccess(data)
                        }
                    }
                    return 
                } catch(error) {
                    if(error instanceof Error) {
                        clearTimeout(timeoutId)
                        removeUser()
                        setIsLoggingOutUser(false)
                        if(onError) {
                            if(!error.cause) {
                                error.cause = {
                                    statusCode: 500,
                                    type: "CONNECTION_ERROR"
                                }
                            }
                            onError(error)
                        }
                    }
                }
            })()
        },
        resetAuthStates() {
            set(store.getInitialState() , true)
        }
    }
})

export default useAuthStore
