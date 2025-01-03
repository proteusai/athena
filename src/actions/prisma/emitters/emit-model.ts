import { ClassDeclaration, Decorator, Node, PropertyDeclaration, ts, Type } from 'ts-morph';

export default function emitModel(stream: NodeJS.WritableStream, cls: ClassDeclaration) {
    const type = cls.getDecorators().find((dec) => dec.getName() === 'model')
        ? 'model'
        : cls.getDecorators().find((dec) => dec.getName() === 'type')
        ? 'type'
        : 'enum';
    const decorators = cls.getDecorators().filter((dec) => dec.getName() !== 'model' && dec.getName() !== 'type' && dec.getName() !== 'Enum');
    const content =
`${type} ${cls.getName()} {
${cls.getProperties().length ? '  ' + cls.getProperties().map((prop) => emitProperty(prop, type === 'enum')).join('\n  ') : ''}
${decorators.length ? '\n  ' + decorators.map((dec) => emitDecorator(dec, true)).join('\n  ') : ''}
}

`;
    stream.write(content);
}

function emitDecorator(dec: Decorator, classDecorator?: boolean) {
    const displayName = dec.getFullName()[0].toLowerCase() + dec.getFullName().slice(1);
    return `${classDecorator ? '@' : ''}@${displayName}${dec.getArguments().length ? `(${dec.getArguments().map((arg) => emitDecoratorArgument(arg)).join(', ')})` : ''}`;
}
function emitDecoratorArgument(arg: Node<ts.Node>) {
    if (arg.getKind() === ts.SyntaxKind.StringLiteral) {
        return arg.getText().replaceAll("'", '"');
    }
    else if (arg.getKind() === ts.SyntaxKind.ObjectLiteralExpression) {
        // return arg.getText().slice(1, -1).replaceAll("'", '').trim();

        // split by comma, if part starts with 'name:', 'map:' or 'sort:' replace ' with ", if not remove quotes, and trim
        return arg.getText().slice(1, -1).split(',').map(
            (part) => part.trim().startsWith('name:') || part.trim().startsWith('map:') || part.trim().startsWith('sort:')
                ? part.replaceAll("'", '"').trim()
                : part.replaceAll("'", '').trim()
            ).join(', ');
    }
    else if (arg.getKind() === ts.SyntaxKind.ArrayLiteralExpression) {
        return arg.getText().replaceAll("'", '').trim();
    }
    else if (arg.getKind() === ts.SyntaxKind.PropertyAccessExpression) {
        return arg.getText().split('.').pop();
    }
    return arg.getText();
}

function emitProperty(prop: PropertyDeclaration, isEnum?: boolean) {
    return `${prop.getName()}${isEnum ? '' : ' ' + convertTsTypeToPrismaType(prop.getType(), prop.hasQuestionToken())}${prop.getDecorators().length === 0 ? '' : ' ' + prop.getDecorators().map((dec) => emitDecorator(dec)).join(' ')}`;
}

export function convertTsTypeToPrismaType(type: Type, optional: boolean) {
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
        default: {
            if (type.isClassOrInterface()) {
                return type.compilerType.symbol.escapedName;
            }
            return type.getText();
        }
    }
}
