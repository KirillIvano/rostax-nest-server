export interface IFileService {
    addFile: (extension: string, file: Buffer) => Promise<string>
}
