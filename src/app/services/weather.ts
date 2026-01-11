import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface WeatherResult {
  temperature: number;
  text: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly weatherMap: Record<number, { text: string; icon: string }> = {
    0:  { text: 'Clear', icon: '☀️' },
    1:  { text: 'Mostly Clear', icon: '🌤️' },

    2:  { text: 'Partly Cloudy', icon: '⛅' },
    3:  { text: 'Cloudy', icon: '☁️' },

    45: { text: 'Fog', icon: '🌫️' },
    48: { text: 'Freezing Fog', icon: '🌫️' },

    51: { text: 'Light Drizzle', icon: '🌦️' },
    53: { text: 'Moderate Drizzle', icon: '🌦️' },
    55: { text: 'Heavy Drizzle', icon: '🌧️' },

    61: { text: 'Light Rain', icon: '🌧️' },
    63: { text: 'Moderate Rain', icon: '🌧️' },
    65: { text: 'Heavy Rain', icon: '🌧️' },

    71: { text: 'Light Snow', icon: '🌨️' },
    73: { text: 'Moderate Snow', icon: '🌨️' },
    75: { text: 'Heavy Snow', icon: '❄️' },

    80: { text: 'Rain Showers', icon: '🌧️' },
    81: { text: 'Heavy Showers', icon: '🌧️' },

    95: { text: 'Thunderstorm', icon: '⛈️' }
  };

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number) {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}&current_weather=true`;

    return this.http.get<any>(url).pipe(
      map(res => {
        const current = res.current_weather;
        const code = current.weathercode;

        return {
          temperature: current.temperature,
          text: this.weatherMap[code]?.text ?? 'Unbekannt',
          icon: this.weatherMap[code]?.icon ?? '❓'
        };
      })
    );
  }
}