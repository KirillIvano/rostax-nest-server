import 'module-alias/register';

import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';

import {AppModule} from './app.module';
import {FILES_FOLDER} from './settings';


const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({exposedHeaders: ['X-Total-Count']});
    app.useStaticAssets(
        FILES_FOLDER,
        {
            prefix: '/static/',
        },
    );

    app.listen(5000, '0.0.0.0');
};

bootstrap();
