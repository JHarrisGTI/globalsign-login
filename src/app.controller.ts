import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GlobalSignApi } from './globalsign-api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly globalSignApi: GlobalSignApi) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  async login() {
    return await this.globalSignApi.login();
  }
}
