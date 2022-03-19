import { ConnectionOptions } from 'typeorm';
import { config } from './config';
import { MapEntity } from '../parser/entites/map.entity';
import { GenreEntity } from '../parser/entites/genre.entity';

export const DB_CONFIG: ConnectionOptions = {
  type: 'mysql',
  port: 3306,
  ...config.db,
  entities: [MapEntity, GenreEntity],
  migrationsRun: false,
  synchronize: false,
  charset: 'utf8mb4',
};
