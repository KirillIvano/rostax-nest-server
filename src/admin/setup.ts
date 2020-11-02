import AdminBro, {ResourceWithOptions} from 'admin-bro';
import {validate} from 'class-validator';
import {Database, Resource} from '@admin-bro/typeorm';
import * as AdminBroExpress from '@admin-bro/express';
import {NestExpressApplication} from '@nestjs/platform-express';

import {CategoryModel} from '~/modules/products/entities/category.entity';
import {ProductModel} from '~/modules/products/entities/product.entity';

import {ADMIN_LOGIN, ADMIN_PASSWORD} from './../settings';


Resource.validate = validate;
AdminBro.registerAdapter({Database, Resource});

export const startAdmin = (app: NestExpressApplication): void => {
    const adminBro = new AdminBro(
        {
            pages: {
                createImage: {
                    component: AdminBro.bundle('./pages/ImagesPage/index.js'),
                },
            },
            locale: {
                language: 'ru',
                translations: {
                    resources: {
                        CategoryModel: {
                            properties: {
                                name: 'Имя',
                                image: 'Картинка категории',
                            },
                        },
                        ProductModel: {
                            properties: {
                                name: 'Имя продукта',
                                price: 'Цена продукта',
                            },
                        },
                    },
                },
            },
            resources: [
                {
                    resource: CategoryModel,

                    options: {
                        listProperties: ['id', 'name'],
                        properties: {
                            'name': {isRequired: true},
                            'image': {isRequired: true},
                        },
                        actions: {
                            new: {
                                before: request => {
                                    return request;
                                },
                            },
                            edit: {
                                before: request => {
                                    return request;
                                },
                            },
                        },
                    },
                },
                {
                    resource: ProductModel,
                    options: {
                        listProperties: ['id', 'name', 'price'],
                    },
                },
            ] as ResourceWithOptions[],
            rootPath: '/adminPanel',
            loginPath: '/adminPanel/login',
            logoutPath: '/adminPanel/logout',
        },
    );

    const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
        authenticate: (email: string, password: string) => {
            return email === ADMIN_LOGIN && password === ADMIN_PASSWORD;
        },
        cookiePassword: ADMIN_PASSWORD,
    });

    app.use(adminBro.options.rootPath, adminRouter);
};
