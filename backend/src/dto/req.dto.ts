import { IsNumber, IsObject, IsString } from 'class-validator';


export class ReqDto{
  @IsObject()
  filter: object;

  @IsObject()
  sort: object;

  @IsString()
  searchQuery:string;

  @IsNumber()
  page:number;

  @IsNumber()
  pageSize:number;
}
