module.exports = `version: "2"
services:
  wp_db:
    container_name: wpletscode____%%PROJECT_NAME%%____db____onport%%PROJECT_PORT%%
    image: mariadb
    volumes: 
      - ./_infra/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: ChangeMeIfYouWant
  wp_site:
    container_name: wpletscode____%%PROJECT_NAME%%____wp____onport%%PROJECT_PORT%%
    image: wordpress
    volumes:
      - ./:/var/www/html
    ports:
      - "%%PROJECT_PORT%%:80"
    links:
      - wp_db:mysql
    environment:
      WORDPRESS_DB_PASSWORD: ChangeMeIfYouWant
  wp_phpmyadmin:
    container_name: wpletscode____%%PROJECT_NAME%%____phpmyadmin____onport%%PROJECT_PORT%%
    image: phpmyadmin/phpmyadmin
    ports: 
      - "%%PHPMYADMIN_PORT%%:80"
    links:
      - wp_db:db
    environment:
      MYSQL_ROOT_PASSWORD: ChangeMeIfYouWant
`