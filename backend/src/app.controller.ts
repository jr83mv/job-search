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

  @Get()
    async hello(@I18n() i18n: I18nContext) {
        return i18n.t('test.HELLO');
    }

  @Post('/positions')
    async positions(@Res() response,@Body() body) {
        const positions = await this.appService.getAllPositions(body);
        return await response.status(HttpStatus.OK).json({
            positions
        }) 
    } 

    @Post('/positions-filter')
    async positionsWithFilter(@Body() body:ReqDto,@Res() response) {
      
      const { filter, sort ,searchQuery,page,pageSize} = body;
      console.log(body)
        const result = await this.appService.getPositionsWithFilter(filter, sort, searchQuery,page,pageSize);
        // console.log(result)
        return await response.status(HttpStatus.OK).json(
            result
        )
    }

    @Post('/positions-search')
    async positionsWithSearch(@Body() body:SearchPayloadDto,@Res() response) {
      
      const { query } = body;
      console.log(body)
        const searchResult = await this.appService.getPositionsWithSearch(query);
        return await response.status(HttpStatus.OK).json(
          searchResult
        )
    }
}
