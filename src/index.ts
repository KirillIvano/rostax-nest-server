import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();

import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';

import {AppModule} from './app.module';
import {FILES_FOLDER} from './settings';
import {startAdmin} from './admin/setup';


const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    startAdmin(app);

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
