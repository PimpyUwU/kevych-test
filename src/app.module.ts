import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {RouteModule} from "./route/route.module";
import {TrainModule} from "./train/train.module";
import {StationModule} from "./station/station.module";

@Module({
  imports: [AuthModule, RouteModule, TrainModule, StationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
