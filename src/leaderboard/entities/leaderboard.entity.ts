import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Summoner } from '../../summoner/entities/summoner.entity';

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column()
  leaguePoints: number;

  @Column()
  winRate: number;

  @OneToOne(() => Summoner, (summoner) => summoner.leaderboard)
  @JoinColumn()
  summoner: Summoner;
}
