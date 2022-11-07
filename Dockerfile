FROM node:16-alpine

WORKDIR /server
COPY . ./
RUN npm install --location=global pnpm \
    && pnpm install --no-frozen-lockfile
CMD pnpm run start