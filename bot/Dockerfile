FROM ubuntu:noble
RUN apt update && apt install wget -y
RUN wget -qO- https://deb.nodesource.com/setup_22.x | bash
RUN apt update && apt install nodejs -y
WORKDIR /root/app
COPY package*.json .
RUN npm ci 
COPY src src
CMD ["npm", "start"]