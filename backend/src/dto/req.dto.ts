import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class ReqDto {
  @IsObject()
  @IsOptional()
  filter: object = {};

  @IsObject()
  @IsOptional()
  sort: object = {};

  @IsString()
  @IsOptional()
  searchQuery: string = '';

  @IsNumber()
  @IsOptional()
  page: number = 1;

  @IsNumber()
  @IsOptional()
  pageSize: number = 10;
}
