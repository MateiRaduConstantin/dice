# Use official node image as the base image
FROM node:14

# Set the working directory in your Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Compile typescript files
RUN npx tsc

# Bind the application to run on port 4000
EXPOSE 4000

# Define the command to start your app
CMD [ "node", "dist/server.js" ]
