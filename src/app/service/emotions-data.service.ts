import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmotionsDataService {

  private dataUrl = './assets/test_data.json';

  constructor(private http: HttpClient) {}

  getEmotionData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}
