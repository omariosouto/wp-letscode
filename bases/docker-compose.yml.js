module.exports = `version: "2"
services:
  wp_db:
    image: mariadb
    volumes: 
      - ./_infra/mysql:/var/lib/mysql
    ports:
      - "8081:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ChangeMeIfYouWant
  wp_site:
    image: wordpress
    volumes:
      - ./:/var/www/html
    ports:
      - "8080:80"
    links:
      - wp_db:mysql
    environment:
      WORDPRESS_DB_PASSWORD: ChangeMeIfYouWant
  wp_phpmyadmin:
    image: phpmyadmin/phpmyadmin
    ports: 
      - "8082:80"
    links:
      - wp_db:db
    environment:
      MYSQL_ROOT_PASSWORD: ChangeMeIfYouWant
`