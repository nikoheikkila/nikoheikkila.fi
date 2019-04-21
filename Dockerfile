# Stage 1: Build Process
FROM node:11-alpine AS build

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn --prefer-offline --non-interactive

COPY . .
RUN yarn build

# Stage 2: Web Server
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/public /usr/share/nginx/html

HEALTHCHECK CMD [ "wget", "-q", "localhost" ]
