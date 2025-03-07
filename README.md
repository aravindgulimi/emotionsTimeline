# EmotionsTimeline

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Deliverables

1. **Complete Angular project** with the implemented component.
2. **README.md** with:
   - Setup instructions
   - Usage examples
   - Any libraries used and why
   - Unit tests

## Prerequisites

Before running the project, install dependencies:
- Run `npm install` or `npm i` to install `node_modules`.
- Run `npm install @swimlane/ngx-charts` to install the `ngx-charts` third-party library dependency.

## Features

- Angular charting library that leverages D3 for rendering.
- Multi-line chart displaying emotion intensity percentages over time.
- Timeline (x-axis) and emotion intensity percentage (y-axis).
- Five emotion lines: happy, surprised, neutral, confused, unhappy.
- Thumbnails and scrubbing functionality.
- Smooth animations and summary statistics.
- Responsive design.
- Unit tests for core functionalities.

## Usage Example

### 1. Importing and Using in the Standalone Component
since the emotionsTimeline component is a standalone component (`EmotionTimelineComponent`), import it directly in `app.component.ts`:

```typescript file
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmotionTimelineComponent } from './emotion-timeline/emotion-timeline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmotionTimelineComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
```

### 2. Use the Component in a Template
Include the component in app.component.html template, passing necessary inputs:

```html
<app-emotion-timeline>
</app-emotion-timeline>
```

### 3. Expected Output
This would render a multi-line chart showing how emotions change over time, with thumbnails appearing at the corresponding timestamps.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name --standalone` to generate a new standalone component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
