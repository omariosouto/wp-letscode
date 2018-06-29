#!/usr/bin/env node

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

        runDocker.on('close', (code) => {
            if(runDockerSuccess.length) {
                console.log('Project up and running :)')
            }
            if(runDockerError.length) {
                console.log('Some problem occurred :(')
            }
        });
    })

program.parse(process.argv)