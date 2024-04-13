import { IsNotEmpty, IsInt } from 'class-validator';

export class Cats {
  id?: string;

  @IsNotEmpty({
    message: 'name is required.',
  })
  name: string;

  @IsInt({ message: 'age should be a number' })
  age: number;

  @IsNotEmpty({
    message: 'color is required.',
  })
  color: string;

  @IsNotEmpty({
    message: 'type is required.',
  })
  type: string;
}
