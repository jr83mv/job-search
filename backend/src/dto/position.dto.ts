import { IsString, IsNumber, IsDate, IsArray, } from 'class-validator';
import { Position} from "../entities/position.entity";


export class PositionDto extends Position{
  @IsString()
  name: string;

  @IsDate()
  postedDate: string;

  @IsString()
  education: string;

  @IsNumber()
  salary: number;

  @IsNumber()
  experience: number;

  @IsString()
  company: string;

  @IsNumber()
  applicants: number;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsString()
  location: string;
}
