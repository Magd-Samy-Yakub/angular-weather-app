import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherService } from './service/weather.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule if needed

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Include HttpClientModule if needed
      providers: [WeatherService], // Provide necessary services
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService); // Inject the WeatherService
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should calculate average correctly', () => {
    const numbers = [10, 20, 30, 40, 50]; // Test data
    const average = component.calculateAverage(numbers);
    expect(average).toBe(30); // Assert the expected average value
  });

  it('should fetch weather information for a location', async () => {
    const mockWeatherData = {
      date: '2023-11-22',
      hour: [
        {
          temp_c: 22,
          feelslike_c: 23,
          wind_kph: 8,
          wind_degree: 200,
          cloud: 10,
          will_it_rain: 0,
        },
      ],
    };

    spyOn(weatherService, 'getWeatherForTimeRange').and.returnValue(
      Promise.resolve(mockWeatherData)
    );

    const location = '';
    const date = new Date('2023-11-22');

    await component.getWeatherReq(location, date);

    expect(weatherService.getWeatherForTimeRange).toHaveBeenCalledWith(
      location,
      date
    );

    expect(component.todayInfo.date).toEqual('2023-11-22');
    expect(component.todayInfo.hour.length).toBeGreaterThan(0);
  });
});
