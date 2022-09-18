import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermercadoService } from './supermercado.service';
import { SupermercadoEntity } from './supermercado.entity';
import { SupermercadoController } from './supermercado.controller';

@Module({
    imports: [TypeOrmModule.forFeature([SupermercadoEntity])],
    controllers: [SupermercadoController],
    providers: [SupermercadoService]
})
export class SupermercadoModule {}
