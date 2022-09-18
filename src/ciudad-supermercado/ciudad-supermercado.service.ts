import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadEntity } from 'src/ciudad/ciudad.entity';
import { SupermercadoEntity } from 'src/supermercado/supermercado.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadSupermercadoService {
    constructor(
        @InjectRepository(CiudadEntity)
        private readonly ciudadRepository: Repository<CiudadEntity>,
    
        @InjectRepository(SupermercadoEntity)
        private readonly supermercadoRepository: Repository<SupermercadoEntity>
      ) {}
    
      async addSupermarketToCity(id_ciudad: number, id_supermercado: number): Promise<CiudadEntity> {
        //const supermercado = await this.supermercadoRepository.findOne(id_supermercado);
        const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id_supermercado} , relations: ["ciudades"] } );
        if (!supermercado)
          throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND);
        
        //const ciudad = await this.ciudadRepository.findOne(id_ciudad, { relations : ["supermercados"] });
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id_ciudad} , relations: ["supermercados"] } );
        if (!ciudad)
          throw new BusinessLogicException("La ciudad con ese identificador no fue encontrado", BusinessError.NOT_FOUND);
    
        ciudad.supermercados = [...ciudad.supermercados, supermercado];
        return await this.ciudadRepository.save(ciudad);
      }
    
      async findSupermarketsFromCity(id_ciudad: number): Promise<SupermercadoEntity[]> {
        //const ciudad: CiudadEntity = await this.ciudadRepository.findOne(id_ciudad, { relations : ["supermercados"] });
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id_ciudad} , relations: ["supermercados"] } );
        if (!ciudad)
          throw new BusinessLogicException("La ciudad con ese identificador no fue encontrada", BusinessError.NOT_FOUND)
    
        return ciudad.supermercados
      }
      
      async findSupermarketFromCity(id_ciudad: number, id_supermercado: number): Promise<SupermercadoEntity> {
        //const supermercado = await this.supermercadoRepository.findOne(id_supermercado);
        const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id_supermercado} , relations: ["ciudades"] } );
          if (!supermercado)
            throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND)
          
          //const ciudad = await this.ciudadRepository.findOne(id_ciudad, { relations : ["supermercados"] });
          const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id_ciudad} , relations: ["supermercados"] } );
          if (!ciudad)
            throw new BusinessLogicException("La ciudad con ese identificador no fue encontrada", BusinessError.NOT_FOUND)
    
          const ciudadSupermercado = ciudad.supermercados.find(e => e.id_supermercado === supermercado.id_supermercado);
    
          if (!ciudadSupermercado)
            throw new BusinessLogicException("El supermercado con el identificador entregado no esta asociado con la ciudad", BusinessError.PRECONDITION_FAILED)
    
          return ciudadSupermercado;
      }
    
      /*
      async updateSupermarketsFromCity(id_ciudad: number, supermercados: SupermercadoEntity[]): Promise<CiudadEntity> {
        //const ciudad = await this.ciudadRepository.findOne(id_ciudad, { relations : ["supermercados"] });
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id_ciudad} , relations: ["supermercados"] } );

        if (!ciudad)
          throw new BusinessLogicException("La ciudad con ese identificador no fue encontrada", BusinessError.NOT_FOUND)
    
        for(let SupermercadoEntity of supermercados){
          //const supermercado = await this.supermercadoRepository.findOne(SupermercadoEntity.id_supermercado);
          const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id_supermercado} , relations: ["ciudades"] });
          if (!supermercado)
            throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND)
        }
    
        ciudad.supermercados = supermercados;
        return await this.ciudadRepository.save(ciudad);
      }*/
    
      async deleteSupermarketFromCity(id_ciudad: number, id_supermercado: number) {
        //const supermercado = await this.supermercadoRepository.findOne(id_supermercado);
        const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id_supermercado} , relations: ["ciudades"] } );
        if (!supermercado)
          throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND)
    
        //const ciudad = await this.ciudadRepository.findOne(id_ciudad, { relations : ["supermercados"] });
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id_ciudad} , relations: ["supermercados"] } );
        if (!ciudad)
          throw new BusinessLogicException("La ciudad con ese identificador no fue encontrada", BusinessError.NOT_FOUND)
    
        ciudad.supermercados = ciudad.supermercados.filter(e => e.id_supermercado !== id_supermercado);
        await this.ciudadRepository.save(ciudad);
      }

}
