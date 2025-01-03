export { default as db } from './db';

// type DecoratorFunction = (target: any) => void;
// type Constraint<S> = (arg?: Array<keyof S> | { name: string, fields?: Array<keyof S>; } | { map: string }, arg2?: Array<keyof S> | { map: string }) => DecoratorFunction;
type ConstraintArg<S> = Array<keyof S> | { name: string, fields?: Array<keyof S>; map?: string; length?: number; sort?: string; clustered?: boolean };
type IndexConstraintArg<S> = ConstraintArg<S> | { type?: any; ops?: any };
type RelationArg<S, T> = {
    fields: Array<keyof S>;
    references: Array<keyof T>;
    name?: string;
    map?: string;
    onUpdate?: 'Cascade' | 'SetNull' | 'SetDefault' | 'NoAction' | 'Restrict';
    onDelete?: 'Cascade' | 'SetNull' | 'SetDefault' | 'NoAction' | 'Restrict';
};

export function auto() {}
export function autoincrement() {}
export function cuid(x?: 2) {}
export function dbgenerated(...args: any[]) {}
export function nanoid() {}
export function now() {}
export function sequence() {}
export function uuid(x?: 4 | 7) {}

export function Default(result: any | { value: any, map: string }) {
    return function (target: any) {};
}

export function Enum(constructor: Function) {}

export function id<S>(arg?: ConstraintArg<S>, arg2?: ConstraintArg<S>) {
    return function (target: any) {};
}

export function ignore() {
    return function (target: any) {};
}

export function index<S>(arg?: IndexConstraintArg<S>, arg2?: IndexConstraintArg<S>) {
    return function (target: any) {};
}

export function map(arg: string | { name: string }) {
    return function (target: any) {};
}

export function model(constructor: Function) {}

export function relation<S, T>(arg: RelationArg<S, T>) {
    return function (target: any) {};
}

export function schema(arg: string | { name: string }) {
    return function (constructor: Function) {};
}

export function type(constructor: Function) {}

export function updatedAt(target: any) {}

export function unique<S>(arg?: ConstraintArg<S>, arg2?: ConstraintArg<S>) {
    return function (target: any) {};
}
