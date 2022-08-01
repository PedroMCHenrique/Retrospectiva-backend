FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ENTRYPOINT [ "npm" ]

CMD ["start"]