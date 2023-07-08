FROM node

WORKDIR /app

COPY package.json .

RUN npm install

ENV MONGO_USER=root
ENV MONGO_PASS=1245 

COPY . .

EXPOSE 80

CMD ["npm", "start"]