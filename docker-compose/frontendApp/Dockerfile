FROM node:14.14-alpine as builder

COPY package.json package-lock.json ./

RUN npm install && mkdir /app-ui && mv ./node_modules ./app-ui

WORKDIR /app-ui

COPY . .

RUN npm run ng build -- --deploy-url=/frontend-app/ --prod


FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app-ui/dist /usr/share/nginx/html
RUN  cp -r  /usr/share/nginx/html/frontend-app/assets /usr/share/nginx/html/

EXPOSE 4200 80

CMD ["nginx", "-g", "daemon off;"]
