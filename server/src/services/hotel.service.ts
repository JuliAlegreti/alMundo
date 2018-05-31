import { Injectable } from '@nestjs/common';
import { Hotel } from '../class/Hotel';
import { db } from 'db';

@Injectable()
export class HotelService {

	getAll(): Hotel[] {
		return db;
	}

	findByName(name: string):Hotel[]{		
		return db.filter((hotel)=>{			
			return hotel.name.toLowerCase().includes(name.toLowerCase())
		});
	}
	
	findByStars(stars: string):Hotel[]{
		let hotels:Hotel[] = [];
		
		for (const star of JSON.parse(stars)) {
			db.forEach(starFilter=>{				
				if(starFilter.stars == star.count) hotels.push(starFilter);
			});			
		}

		return hotels;
	}
	
	findByStarsAndName(name: string, stars: string):Hotel[]{
		let hotels:Hotel[] = this.findByStars(stars);
		return hotels.filter((hotel)=>{			
			return hotel.name.includes(name)
		});
	}
}
