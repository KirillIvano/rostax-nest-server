/* eslint-disable @typescript-eslint/no-var-requires */
import {FileService} from '~/providers/files/files.service';

jest.mock('fs', () => {
    return {
        promises: {
            writeFile: jest.fn(),
        },
    };
});


import fs from 'fs';
const mockedFs = fs as jest.Mocked<typeof fs>;


const FILE_NAME = 'kek.txt';
const FILE_CONTENT = Buffer.from('lol kek');

describe('В сервисе FileService', () => {
    let fileService: FileService;

    beforeEach(async () => {
        fileService = new FileService();

        await fileService.initialize();
    });

    it('корректно работает сохранение файлов', () => {
        fileService.saveFile(FILE_NAME, FILE_CONTENT);

        expect(mockedFs.promises.writeFile).toHaveBeenCalled();
    });
});
