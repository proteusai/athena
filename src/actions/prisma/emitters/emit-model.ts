import { ClassDeclaration, Decorator, PropertyDeclaration, Type } from 'ts-morph';

export default function emitModel(stream: NodeJS.WritableStream, cls: ClassDeclaration) {
    const content =
`model ${cls.getName()} {
  ${cls.getProperties().map((prop) => emitProperty(prop)).join('\n  ')}
}
`;
    stream.write(content);
}

function emitDecorator(dec: Decorator) {
    const displayName = dec.getFullName()[0].toLowerCase() + dec.getFullName().slice(1);
    return `@${displayName}${dec.getArguments().length ? `(${dec.getArguments().map((arg) => arg.getText().replaceAll("'", '"')).join(', ')})` : ''}`;
}

function emitProperty(prop: PropertyDeclaration) {
    return `${prop.getName()} ${convertTsTypeToPrismaType(prop.getType(), prop.hasQuestionToken())}${prop.getDecorators().length === 0 ? '' : ' ' + prop.getDecorators().map((dec) => emitDecorator(dec)).join(' ')}`;
}

function convertTsTypeToPrismaType(type: Type, optional: boolean) {
    if (type.isArray()) {
        return `${convertSimpleTsTypeToPrismaType(type.getArrayElementType()!)}[]`;
    }
    if (optional) {
        return `${convertSimpleTsTypeToPrismaType(type.getNonNullableType())}?`;
    }
    return convertSimpleTsTypeToPrismaType(type);
}
function convertSimpleTsTypeToPrismaType(type: Type) {
    switch (type.getText()) {
        case 'string':
            return 'String';
        case 'number':
            return 'Int';
        case 'boolean':
            return 'Boolean';
        case 'Date':
            return 'DateTime';
        default:
            return type.getText();
    }
}
