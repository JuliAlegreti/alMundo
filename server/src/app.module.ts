import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelController } from 'controllers/hotel.controller';
import { HotelService } from 'services/hotel.service';

@Module({
  imports: [],
  controllers: [AppController, HotelController],
  providers: [ AppService, HotelService ]
})
export class AppModule {}
