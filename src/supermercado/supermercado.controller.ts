import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { SupermercadoDto } from './supermercado.dto';
import { SupermercadoEntity } from './supermercado.entity';
import { SupermercadoService } from './supermercado.service';


@Controller('supermarkets')
@UseInterceptors(BusinessErrorsInterceptor)
export class SupermercadoController { 
    constructor(private readonly supermercadoService: SupermercadoService) {}

  @Get()
  async findAll() {
    return await this.supermercadoService.findAll();
  }

  @Get(':id_supermercado')
  async findOne(@Param('id_supermercado') id_supermercado: number) {
    return await this.supermercadoService.findOne(id_supermercado);
  }

  @Post()
  async create(@Body()supermercadoDto: SupermercadoDto) {
    const supermercado = plainToInstance(SupermercadoEntity, supermercadoDto);
    return await this.supermercadoService.create(supermercado);
  }

  @Put(':id_supermercado')
  async update(@Param('id_supermercado') id_supermercado: number, @Body() supermercadoDto: SupermercadoDto) {
    const supermercado = plainToInstance(SupermercadoEntity, supermercadoDto);
    return await this.supermercadoService.update(id_supermercado, supermercado);
  }

  @Delete(':id_supermercado')
  @HttpCode(204)
  async delete(@Param('id_supermercado') id_supermercado: number) {
    return await this.supermercadoService.delete(id_supermercado);
  }
}
