import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Summoner } from '../../summoner/entities/summoner.entity';

@Entity()
export class QueueEntity {
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
  queueId: number;

  @Column()
  queueType: string;

  @Column()
  tier: string;

  @Column()
  rank: string;

  @Column()
  leaguePoints: number;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @ManyToOne(() => Summoner, (summoner) => summoner.queues)
  @JoinColumn({ name: 'summonerId' })
  summoner: Summoner;
}
