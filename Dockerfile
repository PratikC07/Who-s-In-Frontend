# ---- Stage 1: Build ----
# Use an official Node.js runtime as a parent image.
# Using alpine for a smaller image size.
FROM node:20-alpine AS build

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache.
COPY package.json package-lock.json ./

# Install project dependencies.
RUN npm install

# Copy the rest of the application's source code.
COPY . .

# Build the application for production.
RUN npm run build

# ---- Stage 2: Production ----
# Use a lightweight Nginx image to serve the static files.
FROM nginx:stable-alpine

# Copy the custom Nginx configuration file.
# We will create this file next.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the "build" stage to the Nginx public directory.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world.
EXPOSE 80

# Command to run Nginx in the foreground.
CMD ["nginx", "-g", "daemon off;"]