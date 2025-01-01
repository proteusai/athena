import fs from 'fs';
import path from 'path';

export class SafeFS {
    constructor(private outDir: string) {}

    public createDirectorySync(pth: string) {
        const resolvedPath = path.resolve(path.join(this.outDir, pth));
        if (!fs.existsSync(resolvedPath)) {
            fs.mkdirSync(resolvedPath, { recursive: true });
        }
    }

    public createFile(pth: string, content?: string) {
        const resolvedPath = path.resolve(path.join(this.outDir, pth));
        fs.writeFileSync(resolvedPath, content || '');
    }

    public createWriteStream(pth: string) {
        const resolvedPath = path.resolve(path.join(this.outDir, pth));
        return fs.createWriteStream(resolvedPath);
    }

    public existsSync(pth: string) {
        return fs.existsSync(path.resolve(path.join(this.outDir, pth)));
    }
}
