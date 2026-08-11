import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactEditorLWCScenario2 extends LightningElement {
    @api recordId;

    successHandler(){
        const toast = new ShowToastEvent({ title:'Contact Saved', message:'Your Recently Edited Contact Saved Successfully!' + this.recordId, varient:'success'});
    
        this.dispatchEvent(toast);
    }
    errorHandler(){
        const toast = new ShowToastEvent({ title:'Contact Not Saved', message:'Your Recently Edited Contact Not Saved !', varient:'warning'});
    
        this.dispatchEvent(toast);
    }

}