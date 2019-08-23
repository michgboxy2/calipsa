FROM node:10.15.1

WORKDIR /usr/src/calipsa

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]