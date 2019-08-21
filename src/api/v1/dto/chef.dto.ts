import { IsString, IsEmail, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { isString, isDate } from 'util';

class CreateChefDto {
    @IsString()
    public name: string;

    // @IsString()
    // public resturants:string[];

    // @IsNumber()
    // public view_count:number;

    // @IsString()
    // public picture:string;
    
    // @IsDate()
    // public join_date:Date;
}

export default CreateChefDto;