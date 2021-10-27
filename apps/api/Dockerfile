ARG BASE_IMAGE
FROM ${BASE_IMAGE}

COPY /dist/apps/api /app/api

EXPOSE 3333

CMD ["node", "./api/main.js"]
