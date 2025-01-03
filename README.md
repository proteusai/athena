# Spin

CLI tool to spin out (i.e. generate) code for API server and API client.

## Installation

```bash
npm i -g @proteus-ai/spin
```

## Usage

```bash
spin ./inputs/**/*.ts --out graphql-server
```

## Input Files

TypeScript files are fed into the Spin CLI tool as inputs.

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

The output directory is the directory into which all generated files are to be saved.

By default, the output directory is the current working directory in which the `spin` command
was executed.

You can (and should) explicitly state the output directory by specifying a _tsconfig.json_ file.

```bash
spin --project tsconfig.json --out graphql-server
```

In this case, the output directory is the directory specified in the `compilerOptions.outDir`
field of the _tsconfig.json_ file. This directory is resolved relative to the location of the
_tsconfig.json_ file.

## Emitting Prisma

Whenever the output type is a server (e.g. `spin --out graphql-server` or `spin --out rest-server`)
Prisma schema files will be generated.

You can turn off the generation of Prisma schema files by passing the flag `--prisma false`.

```bash
spin --project tsconfig.json --out graphql-server --prisma false
```

>> **NOTE:** For a file to be processed it must contain at least one model.

### Models

A model is a TypeScript class that is decorated with the `@model` decorator.

```ts
@model
export class User {
    @id() @map('_id') @Default(auto()) @db.ObjectId
    id: string;
    @db.String()
    name?: string;
    @unique()
    email: string;
    posts: Array<Post>;
    profile?: Profile;
}

@model
export class Profile {
    @id() @map('_id') @Default(autoincrement())
    id: number;
    bio: string;
    @unique
    userId: string;
    @relation<Profile, User>({ fields: ['userId'], references: ['id'] })
    user: User;
}
```

If you are familiar with the Prisma syntax, the above snippet is easy to reason about.
These TypeScript models map very closely to Prisma models.

#### Attributes & Functions

TypeScript decorators map to Prisma attributes (and functions).

When the decorators are applied on TypeScript class properties, they map to Prisma field attributes.

For instance, this TypeScript class...

```ts
@model
export class User {
    @id() @map('_id') @Default(auto()) @db.ObjectId
    id: string;
    @db.String()
    name?: string;
    @unique()
    email: string;
    @Default(Role.USER)
    role: Role;
    posts: Array<Post>;
    profile?: Profile;
}
```

...will map to this Prisma model

```prisma
model User {
  id String @id @map("_id") @default(auto()) @db.ObjectId
  name String? @db.String
  email String @unique
  role Role @default(USER)
  posts Post[]
  profile Profile?
}
```

When the decorators are applied on TypeScript classes, they map to Prisma _block_ attributes which start with `@@`.

For instance, this TypeScript class...

```ts
@model
@map('user_profiles')
@id<Profile>(['id', 'userId'])
@unique<Profile>(['id', 'userId'])
export class Profile {
    @map('_id') @Default(autoincrement())
    id: number;
}
```

...will map to this Prisma model

```prisma
model Profile {
  id Int @map("_id") @default(autoincrement())

  @@map("user_profiles")
  @@id([id, userId])
  @@unique([id, userId])
}
```

`Spin` also supports `@relation` attribute as a typed TypeScript decorator.

For instance, this TypeScript class...

```ts
@model
export class Profile {
    @id() @map('_id') @Default(autoincrement())
    id: string;
    @unique()
    userId: string;
    @relation<Profile, User>({ fields: ['userId'], references: ['id'] })
    user: User;
}
```

...will map to this Prisma model

```prisma
model Profile {
  id Int @id @map("_id") @default(autoincrement())
  userId String @unique
  user User @relation(fields: [userId], references: [id])
}
```

The Prisma attribute `@default` is implemented by the TypeScript attribute `@Default`.

#### Array Fields

TypeScript array properties map to Prisma array fields.
For instance, `posts: Array<Post>` maps to `posts: Post[]`.

#### Optional Fields

TypeScript optional properties map to Prisma optional fields.
For instance, `email?: string` maps to `email: String?`.

### Composite Types

Composite types (known as embedded documents in MongoDB) are created from TypeScript interfaces.

For instance, this TypeScript interface...

```ts
export interface Photo {
    height: number;
    width: number;
    url: string;
}
```

...will map to this Prisma type

```prisma
type Photo {
  height Int
  width Int
  url String
}
```

If you wish to apply attributes to your composite type, then you may not be able to use a TypeScript interface.
This is because TypeScript interfaces can't have decorators. In this case, use a TypeScript class
that is decorated with the `@type` decorator.

For instance, this TypeScript class...

```ts
@type
export class Image {
    @Default(300)
    height: number;
    @Default(300)
    width: number;
    @map('address')
    url: string;
}
```

...will map to this Prisma type

```prisma
type Image {
  height Int @default(300)
  width Int @default(300)
  url String @map("address")
}
```

### Enums

Enums are created from TypeScript enums.

For instance, this TypeScript enum...

```ts
enum Role {
    USER,
    ADMIN,
}
```

...will map to this Prisma enum

```prisma
enum Role {
  USER
  ADMIN
}
```

If you wish to apply attributes to your enum, then you may not be able to use a TypeScript enum.
This is because TypeScript enums can't have decorators. In this case, use a TypeScript class
that is decorated with the `@Enum` decorator.

For instance, this TypeScript class...

```ts
@Enum
@map('themes')
export class Theme {
    @map('dark')
    DARK: any;
    @map('light')
    LIGHT: any;
}
```

...will map to this Prisma enum

```prisma
enum Theme {
  DARK @map("dark")
  LIGHT @map("light")

  @@map("themes")
}
```

### Known Limitations when Emitting Prisma

- There's currently no way to emit `@@index([title(sort: Asc), author(sort: Desc)])` or `@@index(fields: [title(length:10), author])`
- There's currently no way to emit functions with arguments `@default(sequence(maxValue: 4294967295))`

### References

- [https://www.prisma.io/docs/orm/prisma-schema/data-model/models](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)
- [https://www.prisma.io/docs/orm/reference/prisma-schema-reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference)

## Emitting GraphQL Server

## Emitting GraphQL JavaScript Client

## Emitting REST API Server (Express)

## Emitting REST API Server (Fastify)

## Emitting REST API JavaScript Client ??

## Defining Custom Handlers

## Tools

- [https://ts-morph.com](https://ts-morph.com)
