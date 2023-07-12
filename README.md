# Astar dApp staking indexer

This is a simple [Astar dApp](https://docs.astar.network/docs/dapp-staking/) staking indexer. The indexer is based on [SubQuery](https://academy.subquery.network/) engine and it indexes the following events:
  - dApp registration
  - dApp unregistration
  - stake
  - unstake
  - nomination transfer
  - reward

The indexer has never been used in production. It has been developed as proof of concept. Although all local testing was good, please take the previous sentences into consideration before use this code in real life scenarios.

## Preparation

#### Environment

- [Typescript](https://www.typescriptlang.org/) are required to compile project and define types.  

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).
- Docker
     

#### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM:

```
npm install -g @subql/cli
```

## Initialize indexer

Under the project directory, run following command to install all the dependency.
```
yarn install
```

## Build the project

```
yarn build
```

## Indexing and Query

#### Run required systems in docker

Start Docker and under the project directory run following command:

```
docker-compose pull && docker-compose up
```
#### Query the project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

You can try to query with the following code to get a taste of how it works.

````graphql
query {
  stakes(first:10, orderBy: TIMESTAMP_ASC) {
    nodes {
      contract,
      staker,
      amount,
      timestamp,
      block
    }
  }
}
````

````graphql
query {
  contracts {
    nodes {
      id,
      owner,
      state,
      blockRegistered,
      blockUnregistered
    }
  }
}
````

## Important note

Don't forget to stake on your favorite dApps on [Astar portal](https://portal.astar.network/astar/dapp-staking/discover).
