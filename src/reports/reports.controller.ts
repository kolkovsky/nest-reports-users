import { Controller, Get } from '@nestjs/common';

@Controller()
export class ReportsController {
  @Get()
  getHello(): string {
    return 'string';
  }
}
