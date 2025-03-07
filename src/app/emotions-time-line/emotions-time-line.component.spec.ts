import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionsTimeLineComponent } from './emotions-time-line.component';
import { EmotionsDataService } from '../service/emotions-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EmotionsTimeLineComponent', () => {
  let component: EmotionsTimeLineComponent;
  let fixture: ComponentFixture<EmotionsTimeLineComponent>;
  let emotionsDataService : EmotionsDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxChartsModule, EmotionsTimeLineComponent, BrowserAnimationsModule],
      // declarations: [EmotionsTimeLineComponent],
      providers: [EmotionsDataService]
    })
    .compileComponents();
  });

    beforeEach(() => {
      fixture = TestBed.createComponent(EmotionsTimeLineComponent);
      component = fixture.componentInstance;
      emotionsDataService = TestBed.inject(EmotionsDataService);
      fixture.detectChanges();
    });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and transform emotion data', () => {
    const mockData = [
      { timestamp: 1000, emotion_list: [{ emotion: 'happy', percent: 75 }] },
      { timestamp: 2000, emotion_list: [{ emotion: 'sad', percent: 20 }] }
    ];

    spyOn(emotionsDataService, 'getEmotionData').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.emotionData.length).toBeGreaterThan(0);
    expect(component.emotionData[0].name).toEqual('happy');
  });

  it('should generate thumbnails correctly for different emotions time lines', () => {
    const mockData1 = [
      { timestamp: 10000, emotion_list: [{ emotion: 'happy', percent: 45.809 }] },
      { timestamp: 10000, emotion_list: [{ emotion: 'surprised', percent: 1.732 }] },
      { timestamp: 10000, emotion_list: [{ emotion: 'neutral', percent: 31.239 }] },
      { timestamp: 10000, emotion_list: [{ emotion: 'confused', percent: 4.836 }] },
      { timestamp: 10000, emotion_list: [{ emotion: 'unhappy', percent: 16.384 }] }
    ];
    const mockData2 = [
      { timestamp: 20000, emotion_list: [{ emotion: 'happy', percent: 46.906 }] },
      { timestamp: 20000, emotion_list: [{ emotion: 'surprised', percent: 0 }] },
      { timestamp: 20000, emotion_list: [{ emotion: 'neutral', percent: 38.138 }] },
      { timestamp: 20000, emotion_list: [{ emotion: 'confused', percent: 4.682 }] },
      { timestamp: 20000, emotion_list: [{ emotion: 'unhappy', percent: 10.274 }] }
    ];

    // Test case for the mockData1
    component.generateThumbnails(mockData1);

    expect(component.thumbnails.length).toEqual(mockData1.length);
    expect(component.thumbnails[0].thumbnailUrl).toContain('sample_thumbnail.jpg');
    
    // Test case for the mockData2
    component.generateThumbnails(mockData2);

    expect(component.thumbnails.length).toEqual(mockData2.length);
    expect(component.thumbnails[0].thumbnailUrl).toContain('sample_thumbnail.jpg');
  });


  //mapping colors with emotion
  it('should assign correct colors to each emotion', () => {
    const expectedColors = ['#FFD700', '#FFA07A', '#9370DB', '#4682B4', '#DC143C'];
    expect(component.colorScheme.domain).toEqual(expectedColors);
  });

  //checking when a new data is received
  it('should update chart when new emotion data is set', () => {
    const newData = [
      { timestamp: 10000, emotion_list: [
        { emotion: 'happy', percent: 60 },
        { emotion: 'surprised', percent: 30 },
        { emotion: 'neutral', percent: 50 },
        { emotion: 'confused', percent: 20 },
        { emotion: 'unhappy', percent: 10 }
      ]}
    ];
    
    spyOn(emotionsDataService, 'getEmotionData').and.returnValue(of(newData));
  
    component.ngOnInit();
  
    expect(component.emotionData.length).toEqual(5); // Ensure all 5 emotions are present
  
    expect(component.emotionData.find(e => e.name === 'happy')?.series[0].value).toEqual(60);
    expect(component.emotionData.find(e => e.name === 'surprised')?.series[0].value).toEqual(30);
    expect(component.emotionData.find(e => e.name === 'neutral')?.series[0].value).toEqual(50);
    expect(component.emotionData.find(e => e.name === 'confused')?.series[0].value).toEqual(20);
    expect(component.emotionData.find(e => e.name === 'unhappy')?.series[0].value).toEqual(10);
  });  
});
