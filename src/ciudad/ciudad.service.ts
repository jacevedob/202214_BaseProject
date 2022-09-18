import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { CiudadEntity } from './ciudad.entity';

@Injectable()
export class CiudadService {
    constructor(
        @InjectRepository(CiudadEntity)
        private readonly ciudadRepository: Repository<CiudadEntity>,
      ) {}
    
      async findAll(): Promise<CiudadEntity[]> {
        return await this.ciudadRepository.find({ relations: ["supermercados"] });
      }
    
      async findOne(id_ciudad: number): Promise<CiudadEntity> {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id_ciudad} , relations: ["supermercados"] } );
        if (!ciudad)
            throw new BusinessLogicException("La ciudad con este identificador no fue encontrada", BusinessError.NOT_FOUND);
        return ciudad;
      }

      /*async findOne(id_ciudad: number): Promise<CiudadEntity> {
        const ciudad = await this.ciudadRepository.findOne(id_ciudad, { relations: ["supermercados"] });
        if (!ciudad)
            throw new BusinessLogicException("La ciudad con este identificador no fue encontrada", BusinessError.NOT_FOUND);
        return ciudad;
      }*/

      async create(ciudad: CiudadEntity): Promise<CiudadEntity> {
        return await this.ciudadRepository.save(ciudad);
      }

      async update(id_ciudad: number, ciudad: CiudadEntity): Promise<CiudadEntity> {
        const persistedCiudad: CiudadEntity = await this.ciudadRepository.findOne({where:{id_ciudad}});
        if (!persistedCiudad)
            throw new BusinessLogicException("La ciudad con este identificador no fue encontrada", BusinessError.NOT_FOUND);
        ciudad.id_ciudad = id_ciudad;
        return await this.ciudadRepository.save(ciudad);
      }

      async delete(id_ciudad: number) {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where:{id_ciudad}});
        if (!ciudad)
            throw new BusinessLogicException("La ciudad con este identificador no fue encontrada", BusinessError.NOT_FOUND);
        await this.ciudadRepository.remove(ciudad);
      }
}