const url = 'http://localhost:3000/' 

async function getData(endpoint){
    const busca = await fetch(`http://localhost:3000/${endpoint}`)
    const data = await busca.json()
    return data
}

export const api = {
    getData
}