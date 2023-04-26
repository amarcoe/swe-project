FROM node:17-alpine

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ['npm', 'run', 'dev']

FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-app/dist /usr/share/nginx/html