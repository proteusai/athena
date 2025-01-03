import { IAction } from './action';
import PrismaAction from './actions/prisma';
import { buildArgv } from './argv';
import { SafeFS } from './fs';
import { buildProject } from './utils/compiler';
import Logger from './utils/logger';
import { getOutputDirectory } from './utils/misc';

export async function cli(): Promise<any> {
    Logger.logTitleAndBanner();

    const argv = await buildArgv();

    // TODO: throw error if certain fields are not provided

    const project = await buildProject({
        sourceFiles: argv._ ? argv._.map((item: any) => item.toString()) : undefined,
        tsConfigFilePath: argv.project,
    });

    const actions: IAction[] = [];
    actions.push(new PrismaAction());

    const outDir = getOutputDirectory(argv.project);
    const fs = new SafeFS(outDir);
    await Promise.all(actions.map(async (action) => {
        await action.run({
            fs,
            isClient: (argv.out as string).endsWith('-client'),
            isServer: (argv.out as string).endsWith('-server'),
            // TODO: add logger
            project,
            shouldOutputPrima: argv.prisma ?? undefined,
        });
    }));
}
