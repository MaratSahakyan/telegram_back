import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType('User')
@Entity('user')
export class UserModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { nullable: false })
  @Length(2, 25)
  firstName: string;

  @Field()
  @Column('varchar', { nullable: true })
  @Length(2, 25)
  lastName: string;

  @Field()
  @Column('varchar', { nullable: false })
  phone: string;

  @Field()
  @Column('varchar', { nullable: false })
  @Length(8, 50)
  password: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
