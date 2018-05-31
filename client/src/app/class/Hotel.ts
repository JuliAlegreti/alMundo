/**
 * Clase para la representación de los hoteles
 */
import { Amenitie } from "./Amenitie";

export class Hotel {
    id: number;
    name: string;
    stars: number;
    price: number;
    image: string;
    amenities: Amenitie[];

    constructor(id, name, stars, price, image, amenities){
        this.id = id;
        this.name = name;
        this.stars = stars;
        this.price = price;
        this.image = image;
        this.amenities = amenities;
    }
}
