import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
