import { ExercisesInfoModule } from './exercises-info/exercises-info.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities from './entities';
import { ManagersModule } from './managers/managers.module';
import { ClientsModule } from './clients/clients.module';
import { AdminsModule } from './admins/admins.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtService } from './services/jwt.service';
import { ExercisesModule } from './exercises/exercises.module';
import { DietsModule } from './diets/diets.module';
import { CancellationModule } from './cancellation/cancellation.module';
import { MailModule } from './mail/mail.module';
import { RecreatePassModule } from './recreate-pass/recreate-pass.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AvatarsModule } from './avatars/avatars.module';
import LogsMiddleware from './middlewares/logs.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [...entities],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ManagersModule,
    ClientsModule,
    AdminsModule,
    ExercisesInfoModule,
    ExercisesModule,
    DietsModule,
    CancellationModule,
    MailModule,
    RecreatePassModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static/'),
    }),
    AvatarsModule,
  ],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware, AuthMiddleware).forRoutes('*');
  }
}
