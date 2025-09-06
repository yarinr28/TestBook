import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs'
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [  GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
