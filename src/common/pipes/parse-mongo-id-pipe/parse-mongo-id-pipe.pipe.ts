import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipePipe implements PipeTransform {
  transform(value: any, argumentMetadata: ArgumentMetadata) {
    console.log(
      '🚀 ~ ParseMongoIdPipePipe ~ transform ~ value:',
      value,
      argumentMetadata,
    );
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`Invalid id: ${value}`);
    }
    return value;
  }
}
