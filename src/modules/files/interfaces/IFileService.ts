export interface IFileService {
    addFile: (extension: string, file: Buffer) => string
}
