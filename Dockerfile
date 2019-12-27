FROM node:10.17-alpine

WORKDIR /mock-api

ENV NODE_ENV=production
ENV PORT=4000
ENV GITHUB_OWNER=bltnico
ENV GITHUB_AUTH_KEY=e3b28fc7fbb4ea348fd34471a4256e56c451cf4c

COPY package.json /mock-api/package.json

RUN cd /mock-api && npm i

COPY . /mock-api/

EXPOSE ${PORT}

CMD ["npm", "start"]
