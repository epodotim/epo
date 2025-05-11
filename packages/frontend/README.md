# EPO Frontend

## Start

```sh
pnpm install
```

### Development

Start the development server with HMR:

```sh
pnpm run dev
```

Your application will be available at `http://localhost:5173`.


## Previewing the Production Build

Preview the production build locally:

```sh
pnpm run preview
```

## Building for Production

Create a production build:

```sh
pnpm run build
```

## Deployment

Deployment is done using the Wrangler CLI.

To build and deploy directly to production:

```sh
pnpm dlx run deploy
```

To deploy a preview URL:

```sh
pnpm dlx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
pnpm dlx wrangler versions deploy
```

### DB

Generate migration sql

```sh
pnpm run db:generate
```

Migration

```sh
pnpm run db:migrate
```

Migtration for PROD

```sh
pnpm dlx wrangler d1 execute prod-d1-tutorial --remote --file=./xxxx.sql
```
