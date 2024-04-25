FROM node:16.0-alpine
LABEL maintainer="Vitalis Wiens <vitalis.wiens@tib.eu>"


WORKDIR app
ADD . /app


RUN sh install_dependencies.sh

EXPOSE 9000

#START THE SERVICE
CMD npm start














