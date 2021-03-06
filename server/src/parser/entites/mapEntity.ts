import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';
import { ApiProperty } from '@nestjs/swagger';
import { BeatSaverItemStat, Difficulty, DifficultyDetail } from '../interfaces/beatsaver';

@Entity({
    name: 'maps',
})
export class MapEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    author: number;

    @ApiProperty()
    @Column()
    bpm: number;

    @ApiProperty()
    @Column()
    duration: number;

    @ApiProperty()
    @Column()
    songName: string;

    @ApiProperty()
    @Column()
    songSubName: string;

    @ApiProperty()
    @Column()
    songAuthorName: string;

    @ApiProperty()
    @Column({
        type: 'set',
        enum: Difficulty,
    })
    difs: Difficulty[];

    @ApiProperty()
    @Column({
        type: 'json',
    })
    difsDetails: DifficultyDetail[];

    @ApiProperty()
    @Column({
        type: 'json',
    })
    tags: number[];

    @ApiProperty()
    @Column({
        type: 'json',
    })
    stats: BeatSaverItemStat;

    @ApiProperty()
    @Column({
        type: 'timestamp',
    })
    uploaded: Date;

    @ApiProperty()
    @Column()
    automapper: boolean;

    @ApiProperty()
    @Column()
    ranked: boolean;

    @ApiProperty()
    @Column()
    qualified: boolean;

    @ApiProperty()
    @Column({
        type: 'timestamp',
    })
    createdAt: Date;

    @ApiProperty()
    @Column({
        type: 'timestamp',
    })
    updatedAt: Date;

    @ApiProperty()
    @Column({
        type: 'timestamp',
    })
    lastPublishedAt: Date;

    @ApiProperty()
    @Column()
    showed: boolean;

    @ApiProperty()
    @Column()
    downloadURL: string;

    @ApiProperty()
    @Column()
    coverURL: string;

    @ApiProperty()
    @Column()
    soundURL: string;
}
