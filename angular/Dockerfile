FROM node:8.9 as node

WORKDIR /app

COPY . /app/

COPY package.json /app/

RUN cd /app && npm init -y

RUN npm run build

EXPOSE 4200


CMD ["npm", "start"]