import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public phone: string;

  @IsString()
  public permission: string;
}

export default CreateUserDto;
