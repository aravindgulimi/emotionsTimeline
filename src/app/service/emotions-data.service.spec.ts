import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmotionsDataService } from './emotions-data.service';

describe('EmotionsDataService', () => {
  let service: EmotionsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmotionsDataService]
    });
    service = TestBed.inject(EmotionsDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch emotion data from JSON file', () => {
    const mockData = [{ timestamp: 1000, emotion_list: [{ emotion: 'happy', percent: 75 }] }];

    service.getEmotionData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/test_data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
