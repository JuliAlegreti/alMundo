import { Injectable } from '@nestjs/common';
import { Hotel } from '../class/Hotel';
import { db } from 'db';

@Injectable()
export class HotelService {
	/**
	 * Devuelve toda la Base de datos 
	 */
	getAll(): Hotel[] {
		return db;
	}

	/**
	 * Filtra los hoteles por nombre
	 * @param name nombre por el cuál se filtra
	 */
	findByName(name: string):Hotel[]{		
		return db.filter((hotel)=>{			
			return hotel.name.toLowerCase().includes(name.toLowerCase())
		});
	}
	
	/**
	 * Filtra por la cantidad de estrellas que tiene el hotel.
	 * @param stars Estrellas por las cual se filtra (Es un JSON, pueden ser varias)
	 */
	findByStars(stars: string):Hotel[]{
		let hotels:Hotel[] = [];
		
		for (const star of JSON.parse(stars)) {
			db.forEach(starFilter=>{				
				if(starFilter.stars == star.count) hotels.push(starFilter);
			});			
		}

		return hotels;
	}
	
	/**
	 * Filtra por nombre y estrellas de un hotel al mismo tiempo
	 * @param name nombre por el cuál se filtra
	 * @param stars Estrellas por las cual se filtra (Es un JSON, pueden ser varias)
	 */
	findByStarsAndName(name: string, stars: string):Hotel[]{
		let hotels:Hotel[] = this.findByStars(stars);
		return hotels.filter((hotel)=>{			
			return hotel.name.includes(name)
		});
	}
}
