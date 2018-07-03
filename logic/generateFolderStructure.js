const fs = require('fs-extra')
const { prompt } = require('inquirer')
const path = require('path')
const { spawn } = require('child_process');
const { gitignore, gitlabCiYML, dockerComposeYML } = require('../bases')
const packageJsonInfo = require('../package.json')

const generateFolderStructure = async (projectName) => {
    // 0 - Creating project folder
    try {
        await fs.ensureDir(projectName)
        console.log(`[${global.name}] File of project created with success`)
    } catch (err) {
        console.log(`[${global.name}] ${err}`)
    }
    
    // 1 - Creating .gitignore
    try {
        await fs.outputFile(`./${projectName}/.gitignore`, gitignore)
        console.log(`[${global.name}] .gitignore created with success`)
    } catch (err) {
        console.log(`[${global.name}] ${err}`)
    }

    // 2 - Creating docker-compose.yml
    let number = 9080
    const checkPage = () => {
        return fetch(`http://localhost:${number}`)
            .then((response) => {
                number++
                return checkPage()
            })
    }
    try {
        // 1 - checar qual porta ta disponível (pegar 2 portas sequenciais)
        let ports = []
        try {
            const teste = await checkPage()
        } catch(err) {
            ports = [number, number + 1]
            console.log(ports)
        }
        // 2 - modificar os valores
        let dockerComposeYMLContent = dockerComposeYML
                                            .replace(/%%PROJECT_NAME%%/gm, projectName)
                                            .replace(/%%PROJECT_PORT%%/gm, ports[0])
                                            .replace('%%PHPMYADMIN_PORT%%', ports[1])
        console.log(dockerComposeYMLContent)
        await fs.outputFile(`./${projectName}/docker-compose.yml`, dockerComposeYMLContent, {
            encoding: 'utf8'
        })
        console.log(`[${global.name}] docker-compose.yml created with success`)
    } catch (err) {
        console.log(`[${global.name}] ${err}`)
    }

    // 3 - Creating gitlab-ci.yml
    try {
        console.log(`[${global.name}] Now, please informe data from your server`)
        const questions = [
            {
                type: 'input',
                name: 'USERNAME',
                message: 'Enter USERNAME of your FTP'
            },
            {
                type: 'input',
                name: 'PASSWORD',
                message: 'Enter PASSWORD of your FTP'
            },
            {
                type: 'input',
                name: 'HOST',
                message: 'Enter HOST of your FTP'
            },
            {
                type: 'input',
                name: 'PROD_FOLDER_PATH',
                message: 'Enter where your folder "themes" and "plugins" must be placed in your server. Something like: "./public_html/wp-content"'
            }
        ]
        const answers = await prompt(questions)
        let gitlabCiYMLContent = gitlabCiYML
                                            .replace('%%USERNAME%%', answers.USERNAME)
                                            .replace('%%PASSWORD%%', answers.PASSWORD)
                                            .replace('%%HOST%%', answers.HOST)
                                            .replace('%%PROD_FOLDER_PATH%%', answers.PROD_FOLDER_PATH)

        await fs.outputFile(`./${projectName}/gitlab-ci.yml`, gitlabCiYMLContent, {
            encoding: 'utf8'
        })

        console.log(`[${global.name}] gitlab-ci.yml created with success`)
    } catch (err) {
        console.log(`[${global.name}] ${err}`)
    }
    // 4 - Initializing git
    console.log(path.join(process.cwd(), projectName))
    const runGitInit = spawn('git', ['init'], {
        cwd: path.join(process.cwd(), projectName),
    })
    let runGitInitSuccess = ''
    let runGitInitError  = ''

    runGitInit.stdout.on('data', (data) => runGitInitSuccess += data);
    runGitInit.stderr.on('data', (data) => runGitInitError += data);

    runGitInit.on('error', (err) => {
        console.log(err)
    })
    runGitInit.on('close', (code) => {
        if(runGitInitSuccess.length) {
            console.log('Project up and running :)')
        }
        if(runGitInitError.length) {
            console.log('Some problem occurred :(')
        }
        console.log(`[${global.name}] Git repository initialized with success!`)
        console.log(`[${global.name}] Project setup finished, now you can access the dir created with "cd ${projectName}" and run the command ${global.name} run`)
    });
}
module.exports = generateFolderStructure