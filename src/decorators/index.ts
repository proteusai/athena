export { default as db } from './db';

export function auto() {}
export function autoincrement() {}

export function Default(result: any) {
    return function (target: any) {};
}

export function id(target: any) {}

export function map(name: string) {
    return function (target: any) {};
}

export function model(constructor: Function) {}
