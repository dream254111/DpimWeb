FROM node:12.15.0

RUN mkdir -p /dpim-web
COPY . /dpim-web

WORKDIR ./dpim-web

RUN npm cache clean -f
RUN npm install

RUN npm run build

CMD [ "npm", "start" ]
