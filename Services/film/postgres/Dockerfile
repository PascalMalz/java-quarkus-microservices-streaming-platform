FROM postgres:13.1
RUN localedef -i de_DE -c -f UTF-8 -A /usr/share/locale/locale.alias de_DE.UTF-8
ENV LANG de_DE.utf8
# add dvdrental sql file so it can be executed on the first start of the container
ADD ./microservice.sql /docker-entrypoint-initdb.d/
# change ownership for sql file to postgres user
RUN chown postgres:postgres /docker-entrypoint-initdb.d/microservice.sql