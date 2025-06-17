import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RootModule } from 'src/di/root.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './presentation/guard/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('Loomi-ecom')
    .setDescription('API used for testing purpose')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.LOCAL_HOST || 3000);
}

bootstrap();
