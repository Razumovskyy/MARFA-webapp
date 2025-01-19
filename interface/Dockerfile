FROM node:20-alpine
WORKDIR /myapp
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start", "--", "-p", "3001"]
