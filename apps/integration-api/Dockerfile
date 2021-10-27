ARG BASE_IMAGE
FROM ${BASE_IMAGE}

COPY /dist/apps/integration-api /app/integration-api

EXPOSE 3333

CMD ["node", "./integration-api/main.js"]
