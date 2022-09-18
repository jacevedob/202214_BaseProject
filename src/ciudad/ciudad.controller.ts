import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';
import { CiudadService } from './ciudad.service';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  async findAll() {
    return await this.ciudadService.findAll();
  }

  @Get(':id_ciudad')
  async findOne(@Param('id_ciudad') id_ciudad: number) {
    return await this.ciudadService.findOne(id_ciudad);
  }

  @Post()
  async create(@Body() ciudadDTO: CiudadDto) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDTO);
    return await this.ciudadService.create(ciudad);
  }

  @Put(':id_ciudad')
  async update(@Param('id_ciudad') id_ciudad: number, @Body() ciudadDTO: CiudadDto) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDTO);
    return await this.ciudadService.update(id_ciudad, ciudad);
  }

  @Delete(':id_ciudad')
  @HttpCode(204)
  async delete(@Param('id_ciudad') id_ciudad: number) {
    return await this.ciudadService.delete(id_ciudad);
  }
}
