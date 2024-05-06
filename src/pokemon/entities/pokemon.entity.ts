import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Pokemon extends Document {
  @Prop({
    unique: true,
    instance: true,
  })
  name: string;
  @Prop({
    unique: true,
    instance: true,
  })
  no: number;
}
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
