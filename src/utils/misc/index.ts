import fs from 'fs';
import path from 'path';

export function getOutputDirectory(tsConfigFilePath?: string): string {
    if (tsConfigFilePath) {
        const tsConfig = JSON.parse(fs.readFileSync(tsConfigFilePath, {
            encoding: 'utf-8',
            flag: 'r',
        }));
        if (tsConfig.compilerOptions?.outDir) {
            return path.resolve(
                path.join(
                    path.dirname(tsConfigFilePath),
                    tsConfig.compilerOptions.outDir,
                ),
            );
        }
    }

    return process.cwd();
}