module.exports = `
stages:
  - production

variables:
  USERNAME: "%%USERNAME%%"
  PASSWORD: "%%PASSWORD%%"
  HOST: "%%HOST%%"
  REPO_FOLDER_PATH: "./wp-content"
  PROD_FOLDER_PATH: "%%PROD_FOLDER_PATH%%"

job_production:
  type: deploy
  stage: production
  image: node:latest
  script:
    - ls -a 
    - apt-get update -qq && apt-get install -y -qq lftp
    - lftp -c "set ftp:ssl-allow no; open -u $USERNAME,$PASSWORD $HOST; mirror -R -L -v $REPO_FOLDER_PATH $PROD_FOLDER_PATH --ignore-time --parallel=10 --exclude-glob .git* --exclude .git/"
  only:
    - master
`