import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Match } from '../../match/entities/match.entity';
import { QueueEntity } from '../../queue/entities/queue.entity';

@Entity()
export class Summoner {
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
  accountId: string;

  @Column()
  summonerId: string;

  @Column()
  puuid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  profileIconId: number;

  @Column({ nullable: true })
  summonerLevel: number;

  @Column({ nullable: true })
  wins: number;

  @Column({ nullable: true })
  losses: number;

  @Column({ nullable: true, type: 'double precision' })
  kda: number;

  @Column({ nullable: true, type: 'double precision' })
  averageCSPM: number;

  @Column({ nullable: true, type: 'double precision' })
  averageVisionScore: number;

  @OneToMany(() => Match, (match) => match.summoner, { nullable: true })
  matches: Match[];

  @OneToMany(() => QueueEntity, (queue) => queue.summoner, { nullable: true })
  queues: QueueEntity[];
}
