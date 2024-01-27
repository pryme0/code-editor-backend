import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { ConfigModule } from '@nestjs/config';
import { FolderModule, UserModule, TabModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    FolderModule,
    UserModule,
    TabModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
