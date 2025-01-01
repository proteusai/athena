import { Project } from 'ts-morph';

export type BuildOptions = {
    sourceFiles?: string[];
    tsConfigFilePath?: string;
};

export async function buildProject(options: BuildOptions): Promise<Project> {
  const project = new Project();

  if (options.sourceFiles) {
    project.addSourceFilesAtPaths(options.sourceFiles);
  } else if (options.tsConfigFilePath) {
    project.addSourceFilesFromTsConfig(options.tsConfigFilePath);
  }
  project.resolveSourceFileDependencies();

  return project;
}