# Spin

CLI tool to spin out (i.e. auto-generate) code for API server and API client.

## Installation

```bash
npm i -g @proteus-ai/spin
```

## Usage

```bash
spin ./inputs/**/*.ts --out graphql-server
```

## Defining Models

A model is a TypeScript class that is decorated with the `@model` decorator.

Models are fed into the Spin CLI tool as inputs.

You can use a glob pattern to specify all the input files. For instance, to use all
TypeScript files in the _/inputs_ folder as input files from which a GraphQL server can
be created, run the following:

```bash
spin ./inputs/**/*.ts --out graphql-server
```

Alternatively, you can add all the source files from a _tsconfig.json_ configuration file
as your input files.

```bash
spin --project tsconfig.json --out graphql-server
```

## Output Directory

## Emitting Prisma

## Emitting GraphQL Server

## Emitting GraphQL JavaScript Client

## Emitting REST API Server (Express)

## Emitting REST API Server (Fastify)

## Emitting REST API JavaScript Client ??

## Defining Custom Handlers

## Tools

(https://ts-morph.com)[https://ts-morph.com]
