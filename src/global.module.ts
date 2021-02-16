import {Module, Global} from '@nestjs/common';

import {FileService} from './providers/files/files.service';


const FileProvider = {
    provide: 'FileService',
    useFactory: async () => {
        const service = new FileService();

        await service.initialize();

        return service;
    },
};

@Global()
@Module({
    providers: [FileProvider],
    exports: [FileProvider],
})
export class GlobalModule {}
