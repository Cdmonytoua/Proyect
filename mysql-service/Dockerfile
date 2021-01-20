FROM mysql:5.7

## The maintainer name and email
MAINTAINER Your Name <name@email.com>

# database = test and password for root = password
ENV MYSQL_DATABASE=libreria \
    MYSQL_ROOT_PASSWORD=password

# when container will be started, we'll have `test` database created with this schema
COPY ./libreria.sql /docker-entrypoint-initdb.d/
