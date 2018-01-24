FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# (Using wildcard to include both package.json AND package-lock.json)
COPY package*.json ./

# Corporate Firewall/Proxy Hacks
# Update NPM config as necessary to workaround network issues
RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npmjs.org/
RUN npm config set always-auth false
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

# Auto-accept Highcharts license and configure install parameters
ENV ACCEPT_HIGHCHARTS_LICENSE true
ENV HIGHCHARTS_VERSION latest
ENV HIGHCHARTS_USE_STYLED false
ENV HIGHCHARTS_USE_MAPS false

# Install NPM packages
RUN npm install

# Undo Corporate Firewall/Proxy Hacks
RUN npm config delete strict-ssl
RUN npm config delete registry
RUN npm config delete always-auth
ENV NODE_TLS_REJECT_UNAUTHORIZED 1

# Bundle app source
COPY . .

# Export port 8080
EXPOSE 8080

CMD ["npm", "start"]