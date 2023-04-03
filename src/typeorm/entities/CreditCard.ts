import CreditCardType from 'src/shared/types';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'credit_cards' })
export class CreditCard {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: CreditCardType.VISA })
  type: string;

  @Column({ unique: true })
  cvc: string;

  @Column()
  expirationDate: Date;

  @Column({ default: false })
  isPaid: boolean;

  // @ManyToOne(() => User, (user) => user.creditCards)
  // @OneToOne(() => User)
  // user: User;
}

// Tên chủ thẻ: username
// kiểu thẻ: type
// số thẻ: id
// số CVC
// tháng năm hết hạn
