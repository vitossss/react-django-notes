FROM node:16.14.2

WORKDIR /note/frontend

COPY package.json /note/frontend

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]