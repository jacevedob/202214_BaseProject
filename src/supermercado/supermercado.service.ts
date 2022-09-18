import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermercadoEntity } from './supermercado.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class SupermercadoService {
    constructor(
        @InjectRepository(SupermercadoEntity)
        private readonly supermercadoRepository: Repository<SupermercadoEntity>
    ){}

    async findAll(): Promise<SupermercadoEntity[]> {
        return await this.supermercadoRepository.find({ relations: ["ciudades"] });
    }

    async findOne(id_supermercado: number): Promise<SupermercadoEntity> {
        const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id_supermercado} , relations: ["ciudades"] } );
        if (!supermercado)
            throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND);
        return supermercado;
    }

    async create(supermercado: SupermercadoEntity): Promise<SupermercadoEntity> {
        if (supermercado.nombre.length > 10)
            return await this.supermercadoRepository.save(supermercado);
        else 
            throw new BusinessLogicException("La longitud del nombre no es correcta. El supermercado no fue creado", BusinessError.PRECONDITION_FAILED);
    }

    async update(id_supermercado: number, supermercado: SupermercadoEntity): Promise<SupermercadoEntity> {
        const persistedSupermercado = await this.supermercadoRepository.findOne({where:{id_supermercado}});
        if (!persistedSupermercado)
            throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND);
        else if (supermercado.nombre.length > 10){
            persistedSupermercado.nombre = supermercado.nombre;
            persistedSupermercado.latitud = supermercado.latitud;
            persistedSupermercado.longitud = supermercado.longitud;
            persistedSupermercado.pagina = supermercado.pagina;
            await this.supermercadoRepository.update(id_supermercado, persistedSupermercado);
            return persistedSupermercado;
        }
        else 
            throw new BusinessLogicException("La longitud del nombre no es correcta. El supermercado no fue actualizado", BusinessError.PRECONDITION_FAILED);
    }

    async delete(id_supermercado: number) {
        const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where:{id_supermercado}});
        if (!supermercado)
            throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND);
        await this.supermercadoRepository.remove(supermercado);
    }
}