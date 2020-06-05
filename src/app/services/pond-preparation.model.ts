export interface AddMedicine {
    id: string;
    farmOwner: string,
    selectMedicine: string, 
    selectTank: string,
     dosage: number,
  }
  export interface AddWaterReport {
      id:string;
    farmOwner: string,
    selectTank: string, 
    selectTime: string,
    selectPH: number,
  }
  export interface AddPicture {
    id:string;
  farmOwner: string,
  selectTank: string, 
    addFile : File
}
  