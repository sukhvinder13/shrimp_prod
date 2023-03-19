export interface AddFeed {
    id: string;
    farmOwner:string,
    feedName: string, tankId: string, quantity: number,medicines :Array<any>,
    unit:string,frequencyDetails:object,
  }
  export interface AddWaterMedicine {
    id: string;
    farmOwner:string,
    tankId: string,medicines : Array<any>,frequencyDetails:object,
  }
  export interface AddCheckNets {
    id: string;
    farmOwner:string,
    feedName: string,
     tankId: string,
    leftCheckNet:object,
  }
  export interface ShrimpCondition {
    id: string;
    farmOwner:string,
    tankId: string,
    serverity: string,
    file:File
  }
  export interface WaterCondition {
    id: string;
    tankId: string,
    farmOwner:string,
    serverity: string,
    file:File
  }
  export interface WaterReport {
    id: string;
    farmOwner: string,
     tankId: string, 
     waterPhReport: object,
     waterTributeReport :object,
     waterDoReport:object
  }
  