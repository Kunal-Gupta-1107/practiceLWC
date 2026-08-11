import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordFormPractice extends LightningElement {
    @api recordId;
    
    successHandler(){
        const toast = new ShowToastEvent({
            title: 'Success',
            message: 'Record Saved Successfully🥳',
            variant: 'success'
        });
        this.dispatchEvent(toast);
    }
    errorHandler(){
        const toast = new ShowToastEvent({
            title: 'Error',
            message: 'Error Occured 😵',
            variant: 'error'
        });
        this.dispatchEvent(toast);
    }
}