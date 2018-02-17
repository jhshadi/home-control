FROM hypriot/rpi-node:latest

WORKDIR /home/
RUN git clone https://github.com/jhshadi/home-control.git

WORKDIR /home/home-control/
RUN npm install

ENTRYPOINT ["npm", "start"]