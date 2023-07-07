import { Injectable } from '@nestjs/common';
import { MongodbService } from './mongodb/mongodb.service';
import { FilterFields } from './types/filterFields.type';
import { PositionDto } from './dto/position.dto';

@Injectable()  
export class AppService {

  private filterFieldHelper(documents:any,filedsResult:any):any{
    let filterFields:FilterFields= {
      education: new Set<string>(),
      salary: new Set<number>(),
      company: new Set<string>(),
      postedDate: new Set<string>(),
      experience: new Set<number>(),
      skills: new Set<string>(),
      location: new Set<string>(),
    };
    
    documents.map((document:PositionDto)=>{
      filterFields.company.add(document.company); 
      filterFields.education.add(document.education);
      filterFields.salary.add(document.salary);
      filterFields.postedDate.add(document.postedDate);
      filterFields.experience.add(document.experience);
      console.log(document)
      console.log(document.company)
      
      filterFields.location.add(document.location);
      document.skills.map((skill)=>{filterFields.skills.add(skill)})
    })
    // console.log(filterFields)
    filedsResult={ education: Array.from(filterFields.education),
      salary:Array.from(filterFields.salary),
      company: Array.from(filterFields.company),
      postedDate: Array.from(filterFields.postedDate),
      experience: Array.from(filterFields.experience),
      skills: Array.from(filterFields.skills),
      location: Array.from(filterFields.location)}
 
      return filedsResult
  }

  constructor(private readonly mongodbService: MongodbService ){}
  
  getHello(): string {  
    return 'Hello World!';
  }

  async getAllPositions(body:any):Promise<any>{
    return await this.mongodbService.findAll(body);
  }
 
  async getPositionsWithFilter(filter: any, sort: any ,searchQuery: string,page:number,pageSize:number):Promise<any>{
    if(filter.education.length<1){
      delete filter.education;
    }
    if(filter.company.length<1){
      delete filter.company;
    }
    if(filter.skills.length<1){
      delete filter.skills;
    }
    if(filter.location.length<1){
      delete filter.location;
    }
    console.log(filter)
    const documents= await this.mongodbService.findAllWithFilter(filter,sort,searchQuery,page,pageSize);
    // console.log(documents)
    let filedsResult:any;
    if(Object.keys(filter).length === 0){
      filedsResult=this.filterFieldHelper(documents,filedsResult);
    }
    const result={"positions":documents,"filterFileds":filedsResult};
    return result;
  }

  async getPositionsWithSearch(query: string):Promise<any>{

    const documents= await this.mongodbService.findAllWithSearch(query);
    // console.log(documents)
    const result={"positions":documents};
    return result;
  }
}
