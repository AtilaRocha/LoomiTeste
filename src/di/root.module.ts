import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from './presentation.module';
import { AuthModule } from 'src/presentation/auth/auth.module';
import { ApplicationModule } from './application.module';
import { CoreModule } from './core.module';
import { InfraModule } from './infra.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ApplicationModule,
    CoreModule,
    InfraModule,
    PresentationModule,
  ],
})
export class RootModule {}
