FROM wordpress:latest

COPY ./src/plugins /var/www/html/wp-content/plugins/
COPY ./src/themes /var/www/html/wp-content/themes/
