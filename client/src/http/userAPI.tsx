import { $authHost, $host } from "./index"


export const registration = async (email: string, password: string) => {
    const response = await $host.post('auth/registration', { email, password })
    // console.log('registration-data', response)
    return (response.data.message)
}


export const login = async (email: string, password: string) => {
    const { data } = await $host.post('auth/login', { email, password })
    // console.log('login-data', data)

    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('userId', data.id)
    return (data)
}

export const check = async () => {
    const { data } = await $authHost.get('auth/check')
    // console.log('check-data', data)
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('userId', data.id)
    return (data)
}


















