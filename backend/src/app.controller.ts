import { Body, Controller, Get, HttpStatus, Post, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { SentryInterceptor } from './sentry-interceptor';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ReqDto } from './dto/req.dto';
import { SearchPayloadDto } from './dto/search-payload.dto';

@UseInterceptors(SentryInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Handles GET request to the root endpoint
   * @param i18n - I18nContext object for internationalization
   * @returns Promise resolving to a greeting message
   */
  @Get()
  async hello(@I18n() i18n: I18nContext) {
    return i18n.t('test.HELLO');
  }

  /**
   * Handles POST request to /positions endpoint
   * @param response - Response object
   * @param body - Request body
   * @returns Promise resolving to positions
   */
  @Post('/positions')
  async getAllPositions(@Res() response, @Body() body) {
    const positions = await this.appService.getAllPositions(body);
    return response.status(HttpStatus.OK).json({ positions });
  }

  /**
   * Handles POST request to /positions-filter endpoint
   * @param body - Request body containing filter, sort, searchQuery, page, and pageSize
   * @param response - Response object
   * @returns Promise resolving to filtered positions and filter fields
   */
  @Post('/positions-filter')
  async getFilteredPositions(@Body() body: ReqDto, @Res() response) {
    const { filter, sort, searchQuery, page, pageSize } = body;
    console.log(body)
    const result = await this.appService.getPositionsWithFilter(filter, sort, searchQuery, page, pageSize);
    console.log(result)
    return response.status(HttpStatus.OK).json(result);
  }

  /**
   * Handles POST request to /positions-search endpoint
   * @param body - Request body containing search query
   * @param response - Response object
   * @returns Promise resolving to positions matching the search query
   */
  @Post('/positions-search')
  async getSearchResult(@Body() body: SearchPayloadDto, @Res() response) {
    const { query } = body;
    const searchResult = await this.appService.getPositionsWithSearch(query);
    return response.status(HttpStatus.OK).json(searchResult);
  }
}
