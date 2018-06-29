# WP Letscode

It's a plugin with the purpose of make easy setup local env for develop WordPress and continuous delivery your projects after each pull request do master branch.

## Things that you will need for use this little thing

- NodeJS
- Composer 
- Docker (make sure that docker-compose command is avaiable)
- Git

## Get Started

1. First, create a project with: `wp-letscode g my-new-site`
2. After create a project, access the folder created and run: `wp-letscode run`

> At this moment, 3 docker containers will be created (one with **php and your site**, one with **mysql** and another with **phpmyadmin**) and you will be able to access: http://localhost:8080/

3. With this setup, **you will be able to versionate a version of your database for local development** and share this with others developers of your team.

## Installing Plugins

1. Composer ...

## Continous Delivery
It's a dream deploy our project after each `git push`. Today we have some tools for this job like DeployHQ. Not everyone has founds on your job to pay for some tool and I found an alternative that I want to share with you.

1. First, you have to create a GitLab account https://gitlab.com/
2. Make the step-by-step to create an repository, push your code created with the command `wp-letscode g my-new-site`.
3. Check your `./gitlab-ci.yml` and fill correctly these settings with your Host info:
```yml
variables:
    USERNAME: ""
    PASSWORD: ""  HOST: ""
    REPO_FOLDER_PATH: "./wp-content"  PROD_FOLDER_PATH: ""
```
4. Commit these changes, and now after each commit your website will be deployed :)

# ToDo: pt-br

- [] rodar um `git init` depois de criar o projeto
- [] Criar os containers com o nome do projeto
- [] Criar comando `wp-letscode stop <nomedoprojeto>`
- [] Incrementar número de portas para saber qual está disponível (só mandar um http.get e verificar se tem algum retorno na hora de criar o docker-compose.yml) 