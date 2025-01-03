import 'reflect-metadata';
import { cli } from './cli';

export { IAction, IRunContext } from './action';

export {
    auto,
    autoincrement,
    cuid,
    dbgenerated,
    nanoid,
    now,
    sequence,
    uuid,

    db,
    Default,
    Enum,
    id,
    ignore,
    index,
    map,
    model,
    relation,
    schema,
    type,
    updatedAt,
    unique,
} from './decorators';

export function main(): Promise<any> {
  return cli();
}

main();
