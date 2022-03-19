import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './config/db-config';
import { ParserModule } from './parser/parser.module';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRoot(DB_CONFIG),
        ParserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
