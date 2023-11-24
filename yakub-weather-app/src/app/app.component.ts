import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private readonly weatherservice: WeatherService) {}

  async getWeatherReq(ort: string, date: Date) {
    const result = (await await this.weatherservice.getWeatherForTimeRange(
      this.ort,
      date
    )) as {
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
        forecastday: [
          {
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
          }
        ];
      };
    };
    return result;
  }

  async getweather() {
    const dateEL = document.getElementById('Date') as HTMLInputElement;
    const day = new Date(dateEL.value);
    const tomorrow = new Date(dateEL.value);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todaytomorow = new Date(dateEL.value);
    todaytomorow.setDate(todaytomorow.getDate() + 2);
    const today = await this.getWeatherReq(this.ort, day);
    const tomorrowReq = await this.getWeatherReq(this.ort, tomorrow);
    const todaytomorowReq = await this.getWeatherReq(this.ort, todaytomorow);

    this.ortInfo = (await today.location) as {
      name: string;
      region: string;
      country: string;
      tz_id: string;
    };
    this.currentInfo = await today.current;
    this.todayInfo = await today.forecast.forecastday[0];
    this.tomorowInfo = await tomorrowReq.forecast.forecastday[0];
    this.todaytomorowInfo = await todaytomorowReq.forecast.forecastday[0];
  }

  updateDate(event: Event) {
    this.date = (event.target as HTMLInputElement).value;
  }

  updateOrt(event: Event) {
    this.ort = (event.target as HTMLInputElement).value;
  }

  calculateAverage(numbers: number[]) {
    if (numbers.length === 0) {
      return 0;
    }
    const sum = numbers.reduce((total, num) => total + num, 0);
    const average = sum / numbers.length;
    const roundedAverage = Math.round(average * 10) / 10;

    return roundedAverage;
  }

  title = 'yakub-weather-app';
  value1 = '';
  value2 = '';
  date = '';
  ort = '';
  todayInfo = {
    date: '',
    hour: [
      {
        temp_c: 0,
        feelslike_c: 0,
        wind_kph: 0,
        wind_degree: 0,
        cloud: 0,
        will_it_rain: 0,
      },
    ],
  };
  tomorowInfo = {
    date: '',
    hour: [
      {
        temp_c: 0,
        feelslike_c: 0,
        wind_kph: 0,
        wind_degree: 0,
        cloud: 0,
        will_it_rain: 0,
      },
    ],
  };
  todaytomorowInfo = {
    date: '',
    hour: [
      {
        temp_c: 0,
        feelslike_c: 0,
        wind_kph: 0,
        wind_degree: 0,
        cloud: 0,
        will_it_rain: 0,
      },
    ],
  };

  ortInfo = {
    name: '',
    region: '',
    country: '',
    tz_id: '',
  };
  currentInfo = {
    cloud: 0,
    temp_c: 0,
    wind_degree: 0,
    wind_kph: 0,
    feelslike_c: 0,
    tz_id: '',
  };
  forecastInfo = {
    forecastday: [
      {
        date: Date,
        day: {},
        hour: [{}],
      },
    ],
  };
}
