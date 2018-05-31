import { Controller, Get, Query, Param } from '@nestjs/common';
import { Hotel } from 'class/Hotel';
import { HotelService } from 'services/hotel.service';

@Controller('hotels')
export class HotelController {
	constructor(private readonly hotelService:HotelService) {}

	/**
	 * Ruta '/' del controlador Hotels (/hotels), realiza el llamado al servicio para traer todos los hoteles
	 */
	@Get()
	findAll():Hotel[] {
		return this.hotelService.getAll();
	}
	
	/**
	 * 
	 * Ruta '/search' del controlador Hotels (/hotels/search), realiza el llamado al servicio para filtrar los hoteles
	 * @param query Tiene el valor de las variables GET que le envíen al servidor
	 */
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