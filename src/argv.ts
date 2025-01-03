import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export async function buildArgv(): Promise<any> {
    const argv = await yargs(hideBin(process.argv))
        .command('[files]', 'Specify glob pattern of files to ingest')
            .option('project', {
                alias: 'p',
                type: 'string',
                description: 'glob pattern of the ts config file'
            })
            .usage('Usage: --project <glob pattern>')
            .option('out', {
                alias: 'o',
                type: 'string',
                description: 'output type'
            })
            .usage('Usage: --out <output type>')
            .option('prisma', {
                type: 'boolean',
                description: 'option to determine if Prisma schema is being output',
                // default: true
            })
            .usage('Usage: --prisma <boolean>')
        .argv;
    return argv;
}
