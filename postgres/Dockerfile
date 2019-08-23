FROM postgres:latest

ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD /seed/ /docker-entrypoint-initdb.d/seed/
# add deploy-schemas.sql file to the /docker-entrypoint-initdb.d/ path
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/
