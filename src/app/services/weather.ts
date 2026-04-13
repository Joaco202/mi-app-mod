import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  apiKey: string = '2f6d579e2e93dbb9466d5f1e3dca124e';
  URI: string = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`;

  constructor(private http: HttpClient) {}
  
  getWeather(city: string, country: string) {
    console.log(`Obteniendo el clima para ${city}, ${country}`);
    return this.http.get(this.URI + city + ',' + country);
  }
}
