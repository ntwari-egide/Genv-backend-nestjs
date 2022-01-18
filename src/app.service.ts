/**
 * @author: ntwari egide
 * @description: main application service of the application
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'GenV is a logistics and delivery company that both flies autonomous vehicles and operates a full-fledged logistics system. It runs operations out of our distribution centers, which are called nests. At a given nest, there is an inventory of medical sup';
  }
}
