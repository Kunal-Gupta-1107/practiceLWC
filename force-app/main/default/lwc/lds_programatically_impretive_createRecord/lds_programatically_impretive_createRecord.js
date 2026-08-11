import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi'

export default class Lds_programatically_impretive_createRecord extends LightningElement {

    name;
    phone;
    fax;
    description;

    nameHandler(event){
        this.name = event.target.value;
    }
    phoneHandler(event){
        this.phone = event.target.value;
    }
    faxHandler(event){
        this.fax = event.target.value;
    }
    desHandler(event){
        this.description = event.target.value;
    }

    saveHandler(){
        const myFields = {'Name':this.name, 'Phone':this.phone , 'Fax':this.fax, 'Description':this.description};
        const recordData = {apiName:'Account', fields:myFields};
        createRecord(recordData).then(result=>{alert('Record created successfully!')}).catch(error=>{alert('Error creating record. ' +   error.body.message)});  
    }
}