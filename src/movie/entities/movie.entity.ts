import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', length: 120, unique: true })
    public name: string;

    public synopsis: string;

    @Column("varchar", { array: true })
    public actors: string[]

    @Column({ type: 'smallint' })
    public stars: number

    @Column({ type: 'boolean', default: false })
    public isDeleted: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}
