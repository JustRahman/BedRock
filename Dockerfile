FROM node:20-alpine

WORKDIR /app

# Copy pre-built standalone server (includes bundled node_modules)
COPY .next/standalone ./

# Copy static assets (not included in standalone by default)
COPY .next/static ./.next/static

# Copy public assets
COPY public ./public

EXPOSE 3000

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["node", "server.js"]
