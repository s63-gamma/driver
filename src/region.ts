export class Region {
  constructor(public name: String,
              public longitude: number,
              public latitude: number,
              public radius: number,
              public costMultiplier: number,
              public uuid: String) {
  }
}
