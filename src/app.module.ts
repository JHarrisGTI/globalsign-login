import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalSignApi } from './globalsign-api';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    GlobalSignApi,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
