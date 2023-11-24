import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '8415ca15952b4510928133858231711';
  private baseUrl = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  async getWeatherForTimeRange(
    location: string,
    startDate: Date
  ): Promise<any> {
    let dd = String(startDate.getDate()).padStart(2, '0');
    let mm = String(startDate.getMonth() + 1).padStart(2, '0');
    let yy = String(startDate.getFullYear());
    let formattedDate = `${yy}-${mm}-${dd}`;
    console.log(formattedDate);
    const days = 3; // Fetch data for 3 days
    const apiUrl = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=${days}&dt=${formattedDate}`;
    console.log(startDate);
    try {
      const response = await this.http
        .get<{
          __zone_symbol__value: {
            location: {};
            current: {
              cloud: number;
              temp_c: number;
              wind_degree: number;
              wind_kph: number;
              feelslike_c: number;
              tz_id: string;
            };
            forecast: {
              forecastday: {
                date: string;
                day: {};
                hour: {
                  temp_c: number;
                  feelslike_c: number;
                  wind_kph: number;
                  wind_degree: number;
                  cloud: number;
                  will_it_rain: number;
                }[];
              }[];
            };
          };
        }>(apiUrl)
        .toPromise();
      return response; // Return the response containing weather data for the specified range of days
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }
}
