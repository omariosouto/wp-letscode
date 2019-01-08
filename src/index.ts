import program  from 'commander'

program
    .command('generate <projectName>')
    .alias('g')
    .description('Gerar uma nova estrutura de projeto WordPress')
    .action((projectName) => console.log('alo'))



program.parse(process.argv)