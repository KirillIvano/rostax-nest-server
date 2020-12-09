import {Module, Global} from '@nestjs/common';

import {FileService} from './providers/files/files.service';


@Global()
@Module({
    providers: [FileService],
    exports: [FileService],
})
export class GlobalModule {}
