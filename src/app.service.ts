import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenidos al Server de App Survey, \n https://survey-form-eo0g.onrender.com/documentation';
  }
}
