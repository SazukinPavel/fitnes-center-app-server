FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install --force

COPY . /app/

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start:prod"]