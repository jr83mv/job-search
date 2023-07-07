import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position, PositionDocument } from '../schema/position.schema';

@Injectable()
export class MongodbService {

  constructor(@InjectModel(Position.name) private readonly positionModel: Model < Position > ){}

  async findAll(body:any):Promise<any>{
    return await this.positionModel.find()
      .exec();
  }

  async findAllWithFilter(filter: any, sort: any,searchQuery: string,page:number,pageSize:number):Promise<any>{
    let query=  this.positionModel.find();
    // console.log(query)
    if (filter) {
      if (filter.education) {
        query=query.where('education').equals(filter.education);
      }
      if (filter.location) {
        query=query.where('location').equals(filter.location);
      }
      if (filter.skills) {
        query=query.where('skills').in(filter.skills);
      }
      if (filter.company) {
        query=query.where('company').equals(filter.company);
      }
      if (filter.experience) {
        query=query.where('experience').equals(filter.education);
      }

    }

    if (searchQuery) {
      query = query.where({ $text: { $search: searchQuery } });
    }

    if (sort) {
      query.sort(sort);
    }

    if (page && pageSize) {
      const skip = (page - 1) * pageSize;
      query = query.skip(skip).limit(pageSize);
    }

    return await query.exec();
  }

  async findAllWithSearch(quer:string):Promise<any>{
    return await this.positionModel
    .find({ $text: { $search: quer } })
    .exec();
  }
}
