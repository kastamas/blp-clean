ARG BASE_IMAGE
FROM ${BASE_IMAGE}

COPY /dist/apps/admin/.next /app/.next
COPY /dist/apps/admin/public /app/public
COPY /dist/apps/admin/package.json /app/

EXPOSE 3000

CMD ["yarn", "start"]
