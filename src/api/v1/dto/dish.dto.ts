import { IsString, IsEmail, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { isString } from 'util';
import { Int32 } from 'bson';

class CreateDishDto {
    @IsString()
    public name: string;

    @IsNumber()
    public category:number;

    // @IsString()
    // public ingredients:string[];

    @IsNumber()
    public price:number;

    // @IsBoolean()
    // public is_spicy:boolean;

    // @IsBoolean()
    // public is_vegan:boolean;

    // @IsBoolean()
    // public is_vegitarian:boolean;
   
    // @IsString()
    // public side_dish:string[];

    // @IsString()
    // public changes:string[];

    // @IsString()
	// public picture:string;
}

export default CreateDishDto;
