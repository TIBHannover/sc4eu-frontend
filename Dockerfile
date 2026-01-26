FROM node:20.11.0
LABEL maintainer="Vitalis Wiens <vitalis.wiens@tib.eu>"


WORKDIR /app
COPY . /app


RUN sh install_dependencies.sh

EXPOSE 9000

#START THE SERVICE
CMD ["npm", "start" ]














