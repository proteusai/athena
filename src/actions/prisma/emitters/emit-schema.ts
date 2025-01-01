export default function emitSchema(stream: NodeJS.WritableStream) {
    const content =
`// This file will be generated ONLY if it does NOT exist

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider        = "prisma-client-js"
  binaryTargets = ["native", "darwin", "darwin-arm64", "linux-musl"]
  previewFeatures = ["prismaSchemaFolder"]
}
`;
    stream.write(content);
}
