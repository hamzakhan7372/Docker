FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

# VOLUME [ "/app/node_modules" ] If use bindmount consider this so that node(container) modules doesn't get overwritten

CMD [ "npm", "start" ]