FROM node:5.9

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install -v

# Bundle app source
COPY . /usr/src/app

EXPOSE 9000
CMD [ "npm", "start" ]
