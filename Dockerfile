FROM node:20-alpine AS base

WORKDIR /app
COPY ../README.md ./

# client base
FROM base AS client-base
COPY ./client/package*.json ./
RUN npm ci
COPY ./client .


# client dev
FROM client-base AS client-dev
EXPOSE 5173
CMD ["npm","run","dev"]

# client build

# server base
FROM base AS server-base
COPY ./server/package*.json ./
RUN npm ci
COPY ./server .

# server dev
FROM server-base AS server-dev
EXPOSE 8080
CMD ["npm","run","dev"]

# test
# FROM server-dev AS test
# CMD ["npm","run","test"]