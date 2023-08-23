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
export class UserEntity {
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
  @Column('varchar')
  phone: string;

  @Field()
  @Column('varchar')
  @Length(8, 50)
  password: string;

  @Field()
  @Column('varchar')
  hashedRt: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ update: false })
  @UpdateDateColumn()
  updatedAt: Date;
}
