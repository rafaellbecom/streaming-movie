import { api } from "./api.js"

const url = 'http://localhost:3000/users'
const options = {}

const loginFormulario = document.querySelector('.login-form')
loginFormulario.addEventListener('submit', (e) => login(e))

async function login(e){
    e.preventDefault()

    const email = loginFormulario.querySelector('.input-email').value
    const senha = loginFormulario.querySelector('.input-password').value
    
    if(email && senha) {
        const users = await api.getData(url, options)
        const consulta = users.filter((user) => {
            const userEmail = user.email
            const userSenha =  user.senha
            return (userEmail == email && userSenha == senha)
        })

        if(consulta.length > 0) {
            window.location.href = '../pages/home.html'
        } else {
            alert('Email ou Senha Inválidos')
        }
    } else {
        alert('Digite Email e Senha')
    }
}