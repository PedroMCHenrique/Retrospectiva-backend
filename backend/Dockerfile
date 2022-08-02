FROM node:16-alpine

WORKDIR /backend

COPY package*.json .

RUN npm ci

COPY . .

ENTRYPOINT [ "npm" ]

CMD ["start"]

EXPOSE 3000