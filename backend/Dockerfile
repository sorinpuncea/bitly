FROM php:8.3-cli

WORKDIR /var/www/html

# Install Composer (optional: you can also just COPY vendor/ if you commit it, but better to install here)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY public/ ./public/
COPY data/ ./data/
COPY src/ ./src/
COPY composer.json composer.lock ./

# Install Composer dependencies (autoload)
RUN composer install --no-dev --optimize-autoloader

# Use PHP's built-in server
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]