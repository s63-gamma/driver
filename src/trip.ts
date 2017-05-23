import {GpsPoint} from "./gps-point";
export class Trip {
  constructor(public startPoint: GpsPoint,
              public endPoint: GpsPoint,
              public tracker: Object,
              public uuid?: String,
              public invoice?: String) {
  }
}
