import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherService, WeatherResult } from './services/weather';
import { Observable } from 'rxjs';

interface City {
  name: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  cities: City[] = [
    { name: 'Bad Ischl', lat: 47.712, lon: 13.627 },
    { name: 'Salzburg', lat: 47.813, lon: 13.044 },
    { name: 'Vienna', lat: 48.208, lon: 16.373 }
  ];

  weather$!: Observable<WeatherResult>;
  selectedCity: string | null = null;

  constructor(private weatherService: WeatherService) {}

  loadCity(city: City) {
    this.selectedCity = city.name;
    this.weather$ = this.weatherService.getWeather(city.lat, city.lon);
  }

}