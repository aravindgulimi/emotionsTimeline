import { Component } from '@angular/core';
import { EmotionsTimeLineComponent } from "./emotions-time-line/emotions-time-line.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ EmotionsTimeLineComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Emotions Timeline Chart';
}
