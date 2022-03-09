FROM node:12

# ARG UPLOAD_SERVICE_API_PORT=3000
# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# ENV PATH=$PATH:/home/node/.npm-global/bin

USER node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# EXPOSE $UPLOAD_SERVICE_API_PORT
CMD [ "node", "index.js" ]