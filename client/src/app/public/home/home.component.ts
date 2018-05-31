import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../class/Hotel';
import { RequestService } from '../../services/app.request';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public nameHotel: string = ''; 
	public stars = [
		{ count: 5, selected: false},
		{ count: 4, selected: false},		
		{ count: 3, selected: false},		
		{ count: 2, selected: false},		
		{ count: 1, selected: false}
	]
	public starsSelected=[];
	private hotels: Hotel[];
	
	constructor(private requestService: RequestService) { }

	ngOnInit() {
		this.getHotels();
		this.starsSelected = this.getSelectedStars();
	}	

	/**
	 * Raliza el envío del nombre por el que se desea filtrar los hoteles al servicio que hace la peticion.
	 */
	public filterByName() {	
		if (this.nameHotel) {
			let hotelsByFilter = this.getSelectedStars(),
				objRequest = (hotelsByFilter.length > 0) ? { 'name': this.nameHotel, 'stars': JSON.stringify(hotelsByFilter)} : { 'name': this.nameHotel};

			this.requestService.get('hotels/search/', objRequest).subscribe((res) => {
				this.hotels = res;	
			});
		} else {
			this.stars.forEach(star=>{
				if(star.selected) star.selected = !star.selected;
			});
			this.getHotels();
		}

	}
	
	/**
	 * Raliza el envío de las estrellas por las que se quiere filtrar los hoteles al servicio que hace la peticion.
	 */
	public filterByStar(){
		let hotelsByFilter = this.getSelectedStars();
		this.starsSelected = this.getSelectedStars();		
		this.nameHotel = '';
		if(hotelsByFilter.length > 0){
			this.requestService.get('hotels/search',{'stars': JSON.stringify(hotelsByFilter)}).subscribe(res=>{
				this.hotels = res;
			});
		}else{
			this.getHotels();
		}
	}	

	/**
	 * Crea el array de las estrellas seleccionadas.
	 */
	public getSelectedStars(){
		return this.stars.filter(star=>{return (star.selected);});
	}

	/**
	 * En caso tal de que checkeen 'todas las estrellas' elimina los filtros de las demás estrellas
	 * @param checked estado del checkbox (checkeado o no)
	 */
	public allStars(checked:boolean){
		if(checked){
			this.stars.forEach(star=>{
				if(star.selected) star.selected = !star.selected;
			});
			this.getHotels();
			this.starsSelected = this.getSelectedStars();
		}
	}

	/**
	 * Convierte en un array tipo numerico de un tamaño especifico
	 * @param n Tamaño del Array
	 */
	public arrayOne(n: number): number[] {
		return Array(n);
	}

	/**
	 * Realiza el llamado al servicio que hace la peticion para traer todos los hoteles.
	 */
	private getHotels() {
		this.requestService.get('hotels', {}).subscribe((res) => {
			this.hotels = res;
		});
	}
	
}
