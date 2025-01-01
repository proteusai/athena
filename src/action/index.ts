import { SafeFS } from '../fs';
import { Project } from 'ts-morph';

export interface IAction {
    run(context: IRunContext): Promise<void>;
}

export interface IRunContext {
    fs: SafeFS;
    isClient: boolean;
    isServer: boolean;
    project: Project;
}
