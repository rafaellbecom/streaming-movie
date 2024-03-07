async function getData(url, options){
    const busca = await fetch(url, options)
    const data = await busca.json()
    return data
}

export const api = {
    getData
}