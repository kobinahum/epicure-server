import { IsString, IsEmail, IsNumber, IsDate, IsDivisibleBy } from 'class-validator';
import { isString } from 'util';
import { Schema } from 'inspector';
import { ObjectId } from 'bson';

class CreateResturantDto {
    @IsString()
    public name: string;

    public chef:ObjectId;

    // @IsString()
    // public contact:{
    //     phone:number,
    //     address:string,
    //     email:string
    // }
    // @IsDate()
    // public opening_date:Date;

    // @IsDate()
    // public opening_hours:Date;

    // @IsDate()
    // public closing_hours:Date;


    @IsString()
    public cuisine:string;

    // public signature_dish:ObjectId;
    // //dishes: string;//Schema
    @IsNumber()
    public popular_score:number;//between 0.0-5

    // @IsString()
	// public picture:string;
}

export default CreateResturantDto;
