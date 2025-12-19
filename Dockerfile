# NSR Population Tracker - Dockerfile
# PHP 7.4+ with Apache and MySQL support

FROM php:7.4-apache

# Install mysqli extension for MySQL connectivity
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Enable Apache mod_rewrite for clean URLs and mod_headers for CORS
RUN a2enmod rewrite headers

# Set the document root to /var/www/html
ENV APACHE_DOCUMENT_ROOT /var/www/html

# Configure Apache to allow .htaccess overrides
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Copy application files
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Create PHP production configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Custom PHP settings
RUN echo "display_errors = Off" >> "$PHP_INI_DIR/conf.d/custom.ini" \
    && echo "log_errors = On" >> "$PHP_INI_DIR/conf.d/custom.ini" \
    && echo "error_log = /var/log/php_errors.log" >> "$PHP_INI_DIR/conf.d/custom.ini" \
    && echo "session.cookie_httponly = 1" >> "$PHP_INI_DIR/conf.d/custom.ini" \
    && echo "session.cookie_secure = 0" >> "$PHP_INI_DIR/conf.d/custom.ini"

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start Apache
CMD ["apache2-foreground"]
