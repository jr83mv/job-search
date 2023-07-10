import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position, PositionDocument } from '../schema/position.schema';
import { FilterFieldKeys } from '../types/filterFieldKeys';

@Injectable()
export class MongodbService {

  constructor(@InjectModel(Position.name) private readonly positionModel: Model<PositionDocument>) {}

  /**
   * Find all positions
   * @param body - Request body
   * @returns Promise resolving to all positions
   */
  async findAll(body: any): Promise<any> {
    return this.positionModel.find().exec();
  }

  /**
   * Find positions with filters
   * @param filter - Filter object
   * @param sort - Sort object
   * @param searchQuery - Search query
   * @param page - Page number
   * @param pageSize - Number of items per page
   * @returns Promise resolving to filtered positions
   */
  async findAllWithFilter(filter: any, sort: any, searchQuery: string, page: number, pageSize: number): Promise<any> {
    let query = this.positionModel.find();

    if (filter) {
      FilterFieldKeys.map((key) => {
        if (filter[key]) {
          query = query.where(key).equals(filter[key]);
        }
      });
    }

    if (searchQuery) {
      query = query.where({ $text: { $search: searchQuery } });
    }
    if (sort) {
      query = query.sort(sort);
    }

    if (page && pageSize) {
      const skip = (page - 1) * pageSize;
      query = query.skip(skip).limit(pageSize);
    }

    return await query.exec();
  }

  /**
   * Find positions with search query
   * @param query - Search query
   * @returns Promise resolving to positions matching the search query
   */
  async findAllWithSearch(query: string): Promise<any> {
    return await this.positionModel.find({ $text: { $search: query } }).exec();
  }
}
