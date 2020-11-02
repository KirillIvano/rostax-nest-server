import {Module} from '@nestjs/common';

import {FileService} from './files.service';
import {FilesController} from './files.controller';


@Module({
    controllers: [FilesController],
    providers: [FileService],
})
export class FilesModule {}
