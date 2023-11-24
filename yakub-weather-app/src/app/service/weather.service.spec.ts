import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule], // Include HttpClientModule here
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data for a given location and date range', () => {
    const mockResponse = {};

    const location = 'Berlin';
    const startDate = new Date('2023-11-30');

    service.getWeatherForTimeRange(location, startDate).then((res) => {
      expect(res).toEqual(mockResponse);
    });

    const apiUrl =
      'http://api.weatherapi.com/v1/forecast.json?key=8415ca15952b4510928133858231711&q=Berlin&days=3&dt=2023-11-30';
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should handle HTTP errors', () => {
    const location = 'Berlin';
    const startDate = new Date('2023-11-30');

    service.getWeatherForTimeRange(location, startDate).catch((error) => {
      expect(error.message).toBe('Failed to fetch weather data');
    });

    const apiUrl =
      'http://api.weatherapi.com/v1/forecast.json?key=8415ca15952b4510928133858231711&q=Berlin&days=3&dt=2023-11-30';
    const req = httpMock.expectOne(apiUrl);

    req.error(new ErrorEvent('network error'), { status: 404 });
  });
});
