---
lang: en
title: Serving Gatsby Site with Docker Multi-Stage Build
author: Niko Heikkilä
type: post
date: 2019-04-23
cover: cover.png
excerpt: >
  In this tutorial, we will build a multi-stage Docker build using a popular static site generator Gatsby.

categories:
  - Docker
  - Gatsby
  - Deployments
---

Developing and deploying static sites can be managed with a wide variety of techniques. If _Docker_ is already a part of your tooling you can drop your content as a container to any platform in the world be it _Kubernetes_, _OpenShift_ or your friend's laptop.

In this tutorial, we will build a multi-stage Docker build using a popular static site generator, _Gatsby_. The methodology below can be used for virtually any kind of website that needs to have its assets built and served as standalone HTML, JS, and CSS files.

We will use Alpine variants of our inherited Docker images. This drops our final image size under 50 MB depending on the amount of static content. Talk about efficiency!

Before going further, check and clone my [website repository][git] which I will use as an example for this post. Knowledge of building and running Docker images is also required to follow.

## Stage 1: Building the Gatsby Site With Node

Building a Gatsby site is relatively easy by installing dependencies and issuing a `gatsby build` command. I'm using Yarn as a dependency manager of choice and I have set up the aforementioned build script to be run with `yarn build`.

By using a multi-stage build we don't have to worry about what's left over during the build process since only the generated content will be kept. This makes our images slimmer and more secure. Below you can find the first stage of our build. Let's go over it line by line.

```dockerfile
FROM node:11-alpine AS build

RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --non-interactive

COPY . .
RUN yarn build
```

We kick off by using the official Alpine Linux image for Node.js version 11 tagged `node:11-alpine`. For reference, we call it `build`.

Then we install the required operating system packages with Alpine's own package manager, `apk`. Since our build process relies on `node-gyp` during compilation we need to have these on hand if you wonder why we are installing Python to a Node container.

Then we set the current working directory to `/app` where our application will live for the rest of this stage. This can be whatever we want but I've made it a convention for myself to always use the simplest possible folder structure inside the container. Generally, `/app` or `/data` are both good choices.

Then we tell Node to work in a special _production_ mode by exporting an environment variable `NODE_ENV=production`. We want to make sure Gatsby optimizes the assets as much as possible to ensure maximum site performance and this would not happen in development mode. It's also a good idea to use this whenever you're building a Node application for production.

Then we copy the dependency files `package.json` and `yarn.lock` to our container and install what they require. This takes advantage of Docker's layer caching so we don't have to build dependencies every time we edit a blog post, for instance. It's a great help since installing Node packages can take up to 2 minutes due to the amount of Gatsby plugins used in our build.

Finally, the rest of the files are copied over and we tell Gatsby to build a site out of these resources. By default, Gatsby outputs these to a folder called `public` on the project root which we will use on the next stage.

If you want, you can stop here and launch the container. There should be a folder full of compiled content ready.

## Stage 2: Serving the Site

Below is the second stage of our build. Again, let's go over it from top to bottom.

```dockerfile
FROM nginx:alpine

COPY nginx /etc/nginx/
COPY --from=build --chown=nginx:nginx /app/public /usr/share/nginx/html
RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080
HEALTHCHECK CMD [ "wget", "-q", "localhost:8080" ]
```

We want to serve the built site with **nginx** web server and luckily we can use an Alpine variant of it as well. This time we don't need to assign a name for this stage since this will be the final one.

I have modified the default nginx configuration by removing the `user nginx;` line. You can copy it from [here][nginx.conf]. Unlike one could guess this line is not needed when we are running our container as a non-root user for security purposes. Within the [actual site configuration][default.conf], I have assigned the TCP port 8080 for this site since non-root users can't bind to ports under 1024. On your host machine, you can bind to any exposed container port so it doesn't really matter.

Next, we shall witness the beauty of multi-stage builds. Here we instruct Docker's `COPY` command to copy files from a prior stage and instantly change their ownership to our custom user without running any additional scripts. Isn't that cool? Be sure to install a new enough version of Docker for this to work.

There's a small caveat of running the container as a non-root user: we need to ensure this user has permissions to use `/var/run/nginx.pid` which handles the running nginx process. Otherwise, the container would fail to start. Fortunately, this is only a one-liner workaround and won't introduce too much overhead to our build.

After this, we tell the Docker image to run all the rest commands as `nginx` user which is included in the official image. You can create another user here and set the ownership of files for it but I've chosen the easier way. Folder `/usr/share/nginx/html` is the standard directory for nginx sites defined in our configuration and easy enough to remember.

Finally, we expose the port 8080 for host machines to bind to and define a custom health check command. Health checks are totally optional for Docker images but they become quite handy in environments where you have dozens of containerized services running. Here we tell the health check to run shell command `wget -q localhost:8080` periodically to fetch our homepage. Should this command fail our container dies or depending on the restart policies it will be restarted. Since the nginx server process runs as the master process (PID 1) any crash in it will also take our container down. Healthcheck here will ensure the same happens if our site locks up for one reason or another.

Note that we don't need to issue the Docker `CMD` command to start the nginx since it will be inherited from the base image.

## Composing It Together

We could now build the Docker image and run it from our terminal using the standard Docker CLI. However, I find it more pleasant to work with Docker Compose even with single-service projects like this one. Let's fill our `docker-compose.yml` file like so:

```yaml
version: "3"

services:
  web:
    build: "."
    image: "nikoheikkila/nikoheikkila.fi"
    container_name: "web-nginx"
    restart: "unless-stopped"
    ports:
      - "8080:8080"
```

Nothing too fancy here. We declare a service called `web` which builds the `Dockerfile` in our project root and tags it with a custom name. The restart policy of `unless-stopped` will keep restarting our container unless we explicitly halt it. As the last rule, we bind our host machine's port 8080 to the same port exposed in the container.

Now let's run `docker-compose up --build -d`. After the image has been successfully built and the container is running (check with `docker-compose ps`) we should be able to visit <http://localhost:8080> with our browser and here our site lies.

## Is Docker Worth It

It is, and yet it is not; this is up to you. If you would be seriously deploying this to production you would need to mount a volume of SSL certificates to the container since not even static sites should roam the Internet wilderness unencrypted. This is not a big issue today with Let's Encrypt and CloudFlare which make the whole process of securing your site very easy. Mounting your own certificates to the container is outside the scope of this tutorial but there are a lot of good resources for it on the Internet.

With Docker you have full control of your running environment and can deploy it anywhere with a little bit of work. On the other hand, I'm using **ZEIT Now** for deployments because it can be configured with [a single JSON file][now.json] and you will instantly get a free SSL certificate and continuous deployments with their GitHub or GitLab integrations. The tradeoff is you don't know anything about the running environment other than it works.

As a third option, you could have your own private server with nginx or Apache configured and drop the content there if you're into more old-school ways of working with Linux stacks. With the low-end droplets from Digital Ocean, this would be a very affordable solution.

It's absolutely fine not to use Docker for everything under the sun. In fact, today _Serverless_ and _FaaS_ have replaced many a use case Docker was built for. Continuous, immutable, and dead easy deployments to the cloud are amazingly easy to carry out even without Docker and statically rendered sites are a perfect use case for them.

[git]: https://github.com/nikoheikkila/nikoheikkila.fi
[nginx.conf]: https://github.com/nikoheikkila/nikoheikkila.fi/blob/master/nginx/nginx.conf
[default.conf]: https://github.com/nikoheikkila/nikoheikkila.fi/blob/master/nginx/conf.d/default.conf
[now.json]: https://github.com/nikoheikkila/nikoheikkila.fi/blob/master/now.json
