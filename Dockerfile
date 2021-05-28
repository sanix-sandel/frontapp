FROM node:lts-alpine
 
# set working directory
#RUN mkdir /usr/src/app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH ./app/node_modules/.bin:$PATH

COPY /frontapp/package.json /app/package.json

RUN npm install

COPY /frontapp /app

RUN npm install -g @vue/cli
# start app
