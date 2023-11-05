import { IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  /**
   * The brand of the car.
   */
  @IsString({
    message: 'Brand must be a string',
  })
  readonly brand: string;

  /**
   * The model of the car.
   */
  @IsString({
    message: 'Model must be a string',
  })
  @MinLength(3, {
    message: 'Model must be at least 3 characters long',
  })
  readonly model: string;
}
