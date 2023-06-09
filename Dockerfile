FROM node:18.14-alpine
WORKDIR /index
COPY . .
RUN npm install
ENV REACT_APP_BASE_API_URL=http://192.168.1.6:3000
ENV REACT_APP_BASE_SHELLY_URL=/api/shelly/relays
ENV REACT_APP_BASE_COFFEE_URL=/api/coffee
ENV REACT_APP_BASE_ALPHA_URL=/api/alpha
ENV REACT_APP_BASE_PRINTER_URL=/api/tplink
ENV REACT_APP_BASE_NIVEUS_URL=/api/air
EXPOSE 3000
CMD npm start