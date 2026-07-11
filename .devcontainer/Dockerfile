FROM node:22.16.0-alpine

RUN apk add --no-cache \
    bash \
    git \
    openssh-client

RUN corepack enable && corepack prepare pnpm@11.4.0 --activate

WORKDIR /workspace

CMD ["sh"]