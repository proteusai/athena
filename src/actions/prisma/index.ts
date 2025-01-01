import { Project } from 'ts-morph';
import { IAction, IRunContext } from '../../action';
import { SafeFS } from '../../fs';
import Logger from '../../utils/logger';
import emitSchema from './emitters/emit-schema';
import emitModel from './emitters/emit-model';

export default class PrismaAction implements IAction {
    public async run(context: IRunContext) {
        if (!context.isServer) {
            return;
        }

        this.createRootDirectory(context.fs);
        this.createSchemaFile(context.fs);
        this.createCodeGenSchemaFile(context.fs);

        this.emitSchemaFileContent(context.fs);
        await this.emitSchemaCodeGenFileContent(context.fs, context.project);
    }

    private async createCodeGenSchemaFile(fs: SafeFS) {
        fs.createFile('prisma/schema.codegen.prisma');
    }

    private async createRootDirectory(fs: SafeFS) {
        fs.createDirectorySync('prisma');
    }

    private async createSchemaFile(fs: SafeFS) {
        if (fs.existsSync('prisma/schema.prisma')) {
            return;
        }
        fs.createFile('prisma/schema.prisma');
    }

    private emitSchemaFileContent(fs: SafeFS) {
        const writeStream = fs.createWriteStream('prisma/schema.prisma');
        emitSchema(writeStream);
        Logger.logGeneratedFile('prisma/schema.prisma');
    }

    private async emitSchemaCodeGenFileContent(fs: SafeFS, project: Project) {
        const writeStream = fs.createWriteStream('prisma/schema.codegen.prisma');
        const classes = project.getSourceFiles().map((sourceFile) => sourceFile.getClasses()).flat();
        classes.forEach((cls) => {
            const decorators = cls.getDecorators();
            const modelDecorator = decorators.find((dec) => dec.getName() === 'model');
            if (modelDecorator) {
                emitModel(writeStream, cls);
                Logger.logCreatedObject(`${cls.getName()} model`);
            }
        });
        Logger.logGeneratedFile('prisma/schema.codegen.prisma');
    }
}
