import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolesEnum } from '../enums';

@ObjectType('auth')
@Entity('auth')
export class AuthEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar')
  @Length(2, 25)
  firstName: string;

  @Field()
  @Column('varchar', { nullable: true })
  @Length(2, 25)
  lastName: string;

  @Field()
  @Column('varchar', { nullable: true, unique: true })
  @Length(2, 25)
  username: string;

  @Field()
  @Column('varchar', { unique: true })
  phone: string;

  @Field()
  @Column('varchar')
  @Length(8, 50)
  password: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @Field()
  @Column('varchar', { nullable: true })
  refreshToken?: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ update: false })
  @UpdateDateColumn()
  updatedAt: Date;
}
