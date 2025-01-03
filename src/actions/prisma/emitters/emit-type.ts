import { InterfaceDeclaration, PropertySignature } from 'ts-morph';
import { convertTsTypeToPrismaType } from './emit-model';

export default function emitType(stream: NodeJS.WritableStream, itfc: InterfaceDeclaration) {
    const content =
`type ${itfc.getName()} {
${itfc.getProperties().length ? '  ' + itfc.getProperties().map((prop) => emitProperty(prop)).join('\n  ') : ''}
}

`;
    stream.write(content);
}

function emitProperty(prop: PropertySignature) {
    return `${prop.getName()} ${convertTsTypeToPrismaType(prop.getType(), prop.hasQuestionToken())}`;
}
