import { ClassDeclaration, Decorator, EnumDeclaration, Node, PropertyDeclaration, ts, Type } from 'ts-morph';

export default function emitEnum(stream: NodeJS.WritableStream, enm: EnumDeclaration) {
    const content =
`enum ${enm.getName()} {
  ${enm.getMembers().map((prop) => prop.getName()).join('\n  ')}
}

`;
    stream.write(content);
}