ARG BASE_IMAGE
FROM ${BASE_IMAGE}

COPY /dist/apps/mobile-api /app/mobile-api

EXPOSE 3333

CMD ["node", "./mobile-api/main.js"]
