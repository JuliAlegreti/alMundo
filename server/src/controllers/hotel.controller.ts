import { Controller, Get, Query, Param } from '@nestjs/common';
import { Hotel } from 'class/Hotel';
import { HotelService } from 'services/hotel.service';

@Controller('hotels')
export class HotelController {
	constructor(private readonly hotelService:HotelService) {}

	@Get()
	findAll():Hotel[] {
		return this.hotelService.getAll();
	}
	
	@Get('search')
	find(@Query() query):Hotel[] {
		if(query.stars && query.name)
			return this.hotelService.findByStarsAndName(query.name, query.stars);
		else if(query.name)
			return this.hotelService.findByName(query.name);
		else if(query.stars)
			return this.hotelService.findByStars(query.stars);
	}
}