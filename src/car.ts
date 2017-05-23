import {GpsPoint} from './gps-point';
export class Car {
  constructor(public uuid: String,
              public buildingYear: number,
              public licensePlate: String,
              public weight: number,
              public milage: number,
              public type: String,
              public gpsPoints?: GpsPoint[],
              public latestGpsPoint?: GpsPoint) {

  }
}
