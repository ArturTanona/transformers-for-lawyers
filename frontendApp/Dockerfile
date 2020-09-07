FROM teracy/angular-cli as builder

COPY package.json package-lock.json ./

RUN npm install && mkdir /app-ui && mv ./node_modules ./app-ui

WORKDIR /app-ui

COPY . .

CMD ["ng", "serve"]
