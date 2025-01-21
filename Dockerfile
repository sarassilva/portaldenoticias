FROM wordpress:latest

COPY ./src/wp-content/plugins /var/www/html/wp-content/plugins/
COPY ./src/wp-content/themes /var/www/html/wp-content/themes/
