# Dockerfile
FROM node:17

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 53508

CMD [ "npm" , "start" ]
