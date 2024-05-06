import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly name: string;
  @IsNotEmpty()
  @IsNumber()
  readonly no: number;
}
