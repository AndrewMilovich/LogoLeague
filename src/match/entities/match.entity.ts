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
export class Match {
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
  matchId: string;

  @Column()
  queueId: number;

  @Column({ type: 'double precision' })
  kda: number;

  @Column()
  championName: string;

  @Column()
  champLevel: number;

  @Column()
  csPerMin: number;

  @Column()
  goldEarned: number;

  @Column()
  lane: string;

  @Column()
  role: string;

  @Column()
  totalPlayerScore: number;

  @Column()
  win: boolean;

  @Column()
  visionScore: number;

  @ManyToOne(() => Summoner, (summoner) => summoner.matches)
  @JoinColumn({ name: 'summonerId' })
  summoner: Summoner;
}
