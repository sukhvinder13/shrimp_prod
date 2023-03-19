export interface AddFarm {
    id: string;
    farmOwner: object, farmHistory: string, village: string,
     mandal: string, city: string, state: string, zip: number,
    country: string, noOfTanks: number, noOfEmployess: number,
    tankCode: string,tankArea:Array<any>
  }
  