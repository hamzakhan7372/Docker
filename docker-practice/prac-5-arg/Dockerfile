FROM node:14

ARG DEFAULT_PORT=80

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

# VOLUME [ "/app/node_modules" ] If use bindmount consider this so that node(container) modules doesn't get overwritten

CMD [ "npm", "start" ]

#when building the image
#docker build -t prac-img:arg --build-arg DEFAULT_PORT=<value(default argument value is 80)> .

