import { api, LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi'

export default class PracticeLWC extends LightningElement {
    @api recordId;

    buttonHandler(){

        deleteRecord(this.recordId)
        .then()
        .catch()
        .finally();

    }
   
}