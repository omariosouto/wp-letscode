#!/usr/bin/env node

require('isomorphic-fetch');
const program = require('commander')
const { spawn } = require('child_process');
const packageJsonInfo = require('./package.json')
global.name = packageJsonInfo.name
global.version = packageJsonInfo.version

const { generateFolderStructure } = require('./logic')

program
    .version(global.version, '-v, --version')
    .description(`WP Let's code CLI \\\o/`)

program
    .command('generate <projectName>')
    .alias('g')
    .description('Generate a new structure of project')
    .action((projectName) => generateFolderStructure(projectName))

program
    .command('run')
    .alias('r')
    .description('Run Docker Compose and try to start project')
    .action(() => {
        const runDocker = spawn('docker-compose', 'up -d'.split(' '))
        let runDockerSuccess = ''
        let runDockerError  = ''

        runDocker.stdout.on('data', (data) => runDockerSuccess += data);
        runDocker.stderr.on('data', (data) => runDockerError += data);

        runDocker.on('close', async (code) => {
            if(runDockerError.includes(`Can't find a suitable configuration file in this directory`)) {
                console.log(`[${global.name}] Make sure that you are in a directory that has an "docker-compose.yml" file`)
            }
            if(runDockerError.includes('up-to-date')) {
                console.log(`[${global.name}] All Docker Containers for this project are already created and running...`)
                console.log('Access: http://localhost:8080')
            }
            if(runDockerError.includes('Creating')) {
                console.log(`[${global.name}] All Docker Containers are starting to run...`)
                recursiveFetch('http://localhost:8080/')
                    .then(async (data) => { 
                        const pageHtml = await data.text()

                        if(pageHtml.includes('</html>')) {
                            console.log('Your project is ready! Access: http://localhost:8080')
                        }
                    })
                    .catch((error) => {
                        console.log('First Error', error)
                    });
            }

        });

        runDocker.on('error', (err) => {
            console.log(`[${global.name}] ${err}. Please, open an issue at: https://github.com/omariosouto/wp-letscode/pulls`)
        })
    })
  
const recursiveFetch = (url) => {
    return fetch(url)
    .then(data => { 
        if(data.text) {
            return data
        } else {
            return recursiveFetch(url)
        }
    })
    .catch(error => {
        return recursiveFetch(url)
        // console.log('First Error', error)
    });

}

program.parse(process.argv)