import { Injectable } from '@nestjs/common';
import { MongodbService } from './mongodb/mongodb.service';
import { FilterFields } from './types/filterFields.type';
import { PositionDto } from './dto/position.dto';
import { FilterFieldKeys } from './types/filterFieldKeys';
import { FilterFieldsResult } from './types/filterFieldsResult';

@Injectable()
export class AppService {
  constructor(private readonly mongodbService: MongodbService) {}

  /**
   * Helper method to distribute filter field values into respective filter fields
   * @param filterFieldName - Name of the filter field
   * @param filterFieldValue - Value of the filter field
   * @param filterFields - Object containing the filter fields and their values
   */
  private filterFieldsDistributionHelper(filterFieldName: any, filterFieldValue: any, filterFields: FilterFields) {
    filterFields[filterFieldName].add(filterFieldValue);
  }

  /**
   * Helper method to extract unique filter fields from documents
   * @param documents - Array of PositionDto documents
   * @param filedsResult - Object to store the filter field values
   * @returns Object containing the unique filter field values
   */
  private filterFieldHelper(documents: any, filedsResult: any): any {
    let filterFields = new FilterFields();

    documents.map((document: PositionDto) => {
      FilterFieldKeys.map((key) => {
        if (!(key === 'skills')) {
          this.filterFieldsDistributionHelper(key, document[key], filterFields);
        }
      });
      document.skills.map((skill) => {
        filterFields.skills.add(skill);
      });
    });

    FilterFieldKeys.map((key) => {
      filedsResult[key] = Array.from(filterFields[key]);
    });

    return filedsResult;
  }

  /**
   * Get a greeting message
   * @returns A greeting message
   */
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Get all positions
   * @param body - Request body
   * @returns Promise resolving to an array of positions
   */
  async getAllPositions(body: any): Promise<any> {
    return await this.mongodbService.findAll(body);
  }

  /**
   * Get positions with filters
   * @param filter - Filter object
   * @param sort - Sort object
   * @param searchQuery - Search query
   * @param page - Page number
   * @param pageSize - Number of items per page
   * @returns Promise resolving to positions and filter fields
   */
  async getPositionsWithFilter(
    filter: any,
    sort: any,
    searchQuery: string,
    page: number,
    pageSize: number,
  ): Promise<any> {
    FilterFieldKeys.map((key) => {
      if (filter[key] && filter[key].length < 1) {
        delete filter[key];
      }
    });

    const documents = await this.mongodbService.findAllWithFilter(filter, sort, searchQuery, page, pageSize);
    let filedsResult: any;
    if (Object.keys(filter).length === 0) {
      filedsResult = this.filterFieldHelper(documents, new FilterFieldsResult());
    }
    const result = { positions: documents, filterFileds: filedsResult };
    return result;
  }

  /**
   * Get positions with search query
   * @param query - Search query
   * @returns Promise resolving to positions
   */
  async getPositionsWithSearch(query: string): Promise<any> {
    const documents = await this.mongodbService.findAllWithSearch(query);
    const result = { positions: documents };
    return result;
  }
}
