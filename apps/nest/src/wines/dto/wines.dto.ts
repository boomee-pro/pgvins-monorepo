import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateWineDto {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @IsDefined()
  @IsNotEmpty()
  readonly description: string;

  @IsDefined()
  @IsNotEmpty()
  readonly origin: string;

  @IsDefined()
  @IsNotEmpty()
  readonly price: number;
}
