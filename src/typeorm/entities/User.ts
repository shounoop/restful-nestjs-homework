import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreditCard } from './CreditCard';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @OneToMany(
    () => CreditCard,
    (creditCard) => creditCard.user,
    // (creditCard) => creditCard.user,
    // { eager: true }
  )
  creditCards: CreditCard[];
}
