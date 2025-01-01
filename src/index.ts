import 'reflect-metadata';
import { cli } from './cli';

export { IAction, IRunContext } from './action';

export {
    auto,
    autoincrement,
    db,
    Default,
    id,
    map,
    model,
} from './decorators';

export function index(): Promise<any> {
  return cli();
}

index();
