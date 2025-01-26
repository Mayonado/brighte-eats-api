FROM node:22-alpine AS node_image

ARG PORT=3000

FROM node_image AS build_image

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node_image AS final_image


# Add non-root user
RUN addgroup -S dgroup && adduser -S duser -G dgroup

# Update the system
RUN apk --no-cache -U upgrade
RUN mkdir -p /home/duser/app/dist

WORKDIR /home/duser/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build_image /app/dist ./dist

EXPOSE ${PORT}

# Switch to non-root user
USER duser
ENTRYPOINT [ "node", "./dist/start-server.js" ]
