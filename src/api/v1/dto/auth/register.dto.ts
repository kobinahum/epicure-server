import { IsString, IsEmail } from 'class-validator';

class LoginDto {

  @IsEmail()
  public email: string;


  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

}

export default LoginDto;
