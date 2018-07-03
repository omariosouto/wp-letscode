let number = 9080
const checkPage = () => {
    return fetch(`http://localhost:${number}`)
        .then((response) => {
            number++
            return checkPage()
        })
}

(async () => {
    
try {
    // 1 - checar qual porta ta disponível (pegar 2 portas sequenciais)
    let ports = []
    try {
        await checkPage()
    } catch(err) {
        ports = [number, number + 1]
        console.log(ports)
    }
    // 2 - modificar os valores
    // await fs.outputFile(`./${projectName}/docker-compose.yml`, dockerComposeYML)
    // console.log(`[${global.name}] docker-compose.yml created with success`)
} catch (err) {
    console.log(`[${global.name}] ${err}`)
}


})()