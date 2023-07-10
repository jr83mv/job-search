import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nJsonLoader, I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { Position, PositionSchema } from './schema/position.schema';
import { join } from 'path';
import { MongodbService } from './mongodb/mongodb.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://san:Test123@cluster0.tyaquse.mongodb.net/?retryWrites=true&w=majority', { dbName: 'details' }),
    MongooseModule.forFeature([
      {
        name: Position.name,
        schema: PositionSchema
      },
    ]),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MongodbService],
})
export class AppModule {}
