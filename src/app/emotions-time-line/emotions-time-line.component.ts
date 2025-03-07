import { Component, Input } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { EmotionsDataService } from '../service/emotions-data.service';

@Component({
  selector: 'app-emotions-time-line',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './emotions-time-line.component.html',
  styleUrl: './emotions-time-line.component.scss',
})
export class EmotionsTimeLineComponent {
  @Input() emotionData: any[] = [];

  thumbnails: { timestamp: string; thumbnailUrl: string }[] = [];

  view: [number, number] = [700, 400];
  colorScheme: Color = {
    name: 'emotionScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FFD700', '#FFA07A', '#9370DB', '#4682B4', '#DC143C'],
  };

  constructor(private emotionsData: EmotionsDataService) {}

  ngOnInit(): void {
    this.loadEmotionData();
  }

  loadEmotionData(): void {
    this.emotionsData.getEmotionData().subscribe((data) => {
      this.emotionData = this.transformData(data);
      this.generateThumbnails(data);
    });
  }

  transformData(data: any[]): any[] {
    const emotions = ['happy', 'surprised', 'neutral', 'confused', 'unhappy'];
    return emotions.map((emotion) => ({
      name: emotion,
      series: data.map((entry) => ({
        name: entry.timestamp,
        value:
          entry.emotion_list.find((e: any) => e.emotion === emotion)?.percent ||
          0,
      })),
    }));
  }

  //Accessing the Thumbnail image here
  generateThumbnails(data: any[]): void {
    this.thumbnails = data.map((entry) => ({
      timestamp: entry.timestamp,
      thumbnailUrl: `assets/sample_thumbnail.jpg`,
    }));
  }

  //Checkinf for the ThumbNail
  onThumbnailClick(timestamp: string): void {
    console.log('Jumping to timestamp:', timestamp);
    this.highlightChartPoint(timestamp);
  }

  // Highlighting the selected Timestamp
  highlightChartPoint(timestamp: string): void {
    this.emotionData = this.emotionData.map((emotion) => ({
      ...emotion,
      series: emotion.series.map(
        (point: { name: string; isSelected?: boolean }) => ({
          ...point,
          selected: point.name === timestamp,
        })
      ),
    }));
  }
}
