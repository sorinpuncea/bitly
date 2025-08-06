FROM php:8.3-cli

WORKDIR /var/www/html

COPY public/ ./public/
COPY data/ ./data/

CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]