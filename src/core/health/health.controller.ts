import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LogRequestInterceptor } from '../../infra/interceptors/logrequest.interceptor';

@Controller('')
@UseInterceptors(LogRequestInterceptor)
export class HealthController {
  @Get(['/health', '/'])
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
