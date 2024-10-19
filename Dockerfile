FROM node:20-alpine

RUN addgroup -S titans && adduser -S kratos -G titans

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN chown -R kratos:titans /usr/src/app

USER kratos

ENV PORT=5000
ENV HOST=0.0.0.0

EXPOSE 5000

CMD ["node", "build/server.js"]
