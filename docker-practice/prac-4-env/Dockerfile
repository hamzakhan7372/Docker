FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 80

EXPOSE $PORT

# VOLUME [ "/app/node_modules" ] If use bindmount consider this so that node(container) modules doesn't get overwritten

CMD [ "npm", "start" ]


#when runing container from this image
#docker run -e PORT=<listening_container_port(default=80)> -p 9021:<listening_container_port> -d <imgname>