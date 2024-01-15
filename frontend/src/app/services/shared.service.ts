import {Injectable} from '@angular/core';
import {MyEventData} from '../calendar/data.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedEventData!: MyEventData;

  setSelectedEventData(data: MyEventData) {
    this.selectedEventData = data;
  }

  getSelectedEventData(): MyEventData {
    return this.selectedEventData;
  }
}
