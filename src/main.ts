/**
 * @author: ntwari egide
 * @description: main entry point of the application
 */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ProductService } from './product/product.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors()

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('GenV apis documentation')
    .setDescription('GenV is a logistics and delivery company that both flies autonomous vehicles and operates a full-fledged logistics system. It runs operations out of our distribution centers, which are called nests. At a given nest, there is an inventory of medical sup')
    .setVersion('1.0')
    .addTag('Products')
    .addTag('Ordered-products')
    .addTag('Orders')
    .addTag('Stored-product')
    .addTag('Shiped-product')
    .addTag('Shipment')
    .build()


  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('swagger-ui', app, document)

  await app.listen(process.env.PORT || 3000);
  
}
bootstrap();
