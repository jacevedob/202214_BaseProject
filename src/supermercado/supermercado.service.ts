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
        return await this.supermercadoRepository.save(supermercado);
    }

    async update(id_supermercado: number, supermercado: SupermercadoEntity): Promise<SupermercadoEntity> {
        const persistedsupermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where:{id_supermercado}});
        if (!persistedsupermercado)
            throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND);
        supermercado.id_supermercado = id_supermercado;
        return await this.supermercadoRepository.save(supermercado);
    }

    async delete(id_supermercado: number) {
        const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where:{id_supermercado}});
        if (!supermercado)
            throw new BusinessLogicException("El supermercado con este identificador no fue encontrado", BusinessError.NOT_FOUND);

        await this.supermercadoRepository.remove(supermercado);
    }
}