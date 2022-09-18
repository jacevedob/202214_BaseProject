import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { SupermercadoDto } from 'src/supermercado/supermercado.dto';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { plainToInstance } from 'class-transformer';
import { SupermercadoService } from 'src/supermercado/supermercado.service';
import { SupermercadoEntity } from 'src/supermercado/supermercado.entity';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadSupermercadoController { 
    constructor(private readonly ciudadSupermercadoService: CiudadSupermercadoService) {}

  @Get(':id_ciudad/supermarkets/:id_supermercado')
  async findSupermarketFromCity(@Param('id_supermercado') id_supermercado: number, @Param('id_ciudad') id_ciudad: number) {
    return await this.ciudadSupermercadoService.findSupermarketFromCity(id_supermercado, id_ciudad);
  }

  @Get(':id_ciudad/supermarkets')
  async findSupermarketsFromCity(@Param('id_ciudad') id_ciudad: number) {
    return await this.ciudadSupermercadoService.findSupermarketsFromCity(id_ciudad);
  }

  @Post(':id_ciudad/supermarkets/:id_supermercado/')
  async updateSupermarketsFromCity(@Param('id_supermercado') id_supermercado: number, @Param('id_ciudad') id_ciudad: number) {
    return await this.ciudadSupermercadoService.addSupermarketToCity(id_ciudad, id_supermercado);
  }

  /*
  @Put(':id_ciudad/supermercados')
  async associateArtistMovement(@Param('id_ciudad') id_ciudad: number, @Body() supermercadoDTO: SupermercadoDto[]) {
    const supermercados = plainToInstance(SupermercadoEntity, supermercadoDTO)
    return await this.ciudadSupermercadoService.updateSupermarketsFromCity(id_ciudad, supermercados);
  }*/

  @Delete(':id_ciudad/supermarkets/:id_supermercado')
  @HttpCode(204)
  async deleteSupermarketFromCity(@Param('id_supermercado') id_supermercado: number, @Param('id_ciudad') id_ciudad: number) {
    return await this.ciudadSupermercadoService.deleteSupermarketFromCity(id_supermercado, id_ciudad);
  }
}
