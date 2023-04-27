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
  ],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
