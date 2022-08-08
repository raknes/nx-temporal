

# Nx Temporal-Worker

Implement a Temporal.io workflow in Nx monorepo.

This project was generated using [Nx](https://nx.dev).

Temporal workflows are compiled separately from worker project by using a custom NX executor: https://github.com/raknes/nx-temporal/blob/95fa5e92999a7d41ea1121f1d141bc994159c36f/tools/executors/build-temporal-workflow/impl.ts

## Prepare repo

Install dependencies
```
npm i
```

## Start Temporal Server

https://docs.temporal.io/application-development/foundations#run-a-dev-cluster

## Build the workflow code

```
npx nx run temporal-worker:build-temporal-workflow
```

## Build and run worker

This will also compile the client code

```
npm run start temporal-worker
```

node dist/apps/temporal-worker/client.js
```

