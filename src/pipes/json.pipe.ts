import {PipeTransform, Injectable, BadRequestException} from '@nestjs/common';


@Injectable()
export class JsonPipe<TData> implements PipeTransform {
    transform(value?: string): undefined | TData {
        if (!value) return undefined;

        try {
            return JSON.parse(value);
        } catch {
            throw new BadRequestException('Неверные параметры');
        }
    }
}
