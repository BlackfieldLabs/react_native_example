export class Device {
    id: number;
    rssi: number;
    deviceName: string;
    ipAddress: string;
  
    constructor(id: number, rssi: number, deviceName: string, ipAddress: string) {
      this.id = id;
      this.rssi = rssi;
      this.deviceName = deviceName;
      this.ipAddress = ipAddress;
    }
  }
  