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

      async create(ciudad: CiudadEntity): Promise<CiudadEntity> {
        if (ciudad.pais.toLowerCase() == "argentina" || ciudad.pais.toLowerCase() == "ecuador" || ciudad.pais.toLowerCase() == "paraguay" ){
          ciudad.pais = ciudad.pais.toLowerCase();
          return await this.ciudadRepository.save(ciudad);
        }
        else
          throw new BusinessLogicException("El país no es valido. La ciudad no fue creada", BusinessError.PRECONDITION_FAILED);
      }

      async update(id_ciudad: number, ciudad: CiudadEntity): Promise<CiudadEntity> {
        const persistedCiudad = await this.ciudadRepository.findOne({where:{id_ciudad}});
        if (!persistedCiudad)
            throw new BusinessLogicException("La ciudad con este identificador no fue encontrada", BusinessError.NOT_FOUND);
        else if (ciudad.pais.toLowerCase() == "argentina" || ciudad.pais.toLowerCase() == "ecuador" || ciudad.pais.toLowerCase() == "paraguay" ){
          persistedCiudad.nombre = ciudad.nombre;
          persistedCiudad.pais = ciudad.pais.toLowerCase();
          persistedCiudad.habitantes = ciudad.habitantes;
          await this.ciudadRepository.update(id_ciudad, persistedCiudad);
          return persistedCiudad
        }
        else
          throw new BusinessLogicException("El país no es valido. La ciudad no fue actualizada", BusinessError.PRECONDITION_FAILED);
      }

      async delete(id_ciudad: number) {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where:{id_ciudad}});
        if (!ciudad)
            throw new BusinessLogicException("La ciudad con este identificador no fue encontrada", BusinessError.NOT_FOUND);
        await this.ciudadRepository.remove(ciudad);
      }
}