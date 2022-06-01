# Stage 1: Compile and build Vue app

# Use official node image as the base image
FROM node:16-alpine as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app

# Install all the dependencies
RUN npm ci --quiet

ARG RELEASE
ENV VUE_APP_SENTRY_RELEASE=${RELEASE:-dev}

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest
#LABEL org.opencontainers.image.source="https://github.com/fantastiskefroe/spir-qr"

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist /usr/share/nginx/html

# Copy conf file
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
