import { CiudadEntity } from 'src/ciudad/ciudad.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupermercadoEntity {
    @PrimaryGeneratedColumn('uuid')
    id_supermercado: number;
   
    @Column()
    nombre: string;
    
    @Column()
    longitud: string;
    
    @Column()
    latitud: string;

    @Column()
    pagina: string;

    @ManyToMany(() => CiudadEntity, ciudad => ciudad.supermercados)
    @JoinTable()
    ciudades: CiudadEntity[];
}