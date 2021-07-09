FROM node:16-alpine3.14

WORKDIR /usr/src/app
COPY package.json ./
RUN JOBS=MAX npm install --include=dev && rm -rf /tmp/*
COPY . ./
RUN JOBS=MAX npm run react-build
ENV UDEV=1

CMD ["npm", "run", "node-start"]
