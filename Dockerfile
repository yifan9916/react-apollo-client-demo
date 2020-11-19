FROM node:14-alpine as base

EXPOSE 8080
ENV NODE_ENV=production \
  PORT=8080 \
  PATH=/node/node_modules/.bin:$PATH
RUN apk add --no-cache tini
WORKDIR /node
COPY package*.json ./
RUN yarn config list \
  && yarn --production \
  && yarn cache clean --force
ENTRYPOINT ["/sbin/tini", "--"]

FROM base as dev
WORKDIR /node/app
ENV NODE_ENV=development
RUN yarn config list \
  && yarn \
  && yarn cache clean --force
CMD ["yarn", "start"]

FROM dev as test
COPY . .
RUN yarn audit || true
RUN yarn tsc \
  && yarn test

FROM test as source
ENV NODE_ENV=production
RUN yarn build

FROM nginx:1-alpine
LABEL org.opencontainers.image.authors=yifan.9916@gmail.com
LABEL org.opencontainers.image.title="Frontend Demo"
LABEL org.opencontainers.image.licenses=MIT
LABEL yifan.nodeversion=$NODE_VERSION

EXPOSE 80
WORKDIR /srv/www
COPY nginx /etc/nginx
COPY --from=source /node/app/dist .

HEALTHCHECK --interval=1m --timeout=3s \
  CMD [ "wget", "-q", "0.0.0.0:80" ] || exit 1