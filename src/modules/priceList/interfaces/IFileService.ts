export interface IFileService {
    saveFile: (fileName: string, file: Buffer) => Promise<void>
}
