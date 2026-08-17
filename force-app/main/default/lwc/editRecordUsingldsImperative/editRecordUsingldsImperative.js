import { api, LightningElement } from 'lwc';

import ACC from '@salesforce/schema/Account';
import ACCID from '@salesforce/schema/Account.Id';
import ACCNAME from '@salesforce/schema/Account.Name';
import ACCPHONE from '@salesforce/schema/Account.Phone';
import ACCFAX from '@salesforce/schema/Account.Fax';
import ACCDESC from '@salesforce/schema/Account.Description';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class EditRecordUsingldsImperative extends LightningElement {

    @api recordId;

    name;
    phone;
    fax;
    description;
    isLoading=false;

    nameHandler(event){
        this.name=event.target.value;
    }
    phoneHandler(event){
        this.phone=event.target.value;
    }
    faxHandler(event){
        this.fax=event.target.value;
    }
    descHandler(event){
        this.description=event.target.value;
    }
    
    buttonHandler(event){
        this.isLoading = true;

        const fields = {};
        fields[ACCID.fieldApiName] = this.recordId;
        fields[ACCNAME.fieldApiName] = this.name;
        fields[ACCPHONE.fieldApiName] = this.phone;
        fields[ACCFAX.fieldApiName] = this.fax;
        fields[ACCDESC.fieldApiName] = this.description;
        
        const recordData = {fields}
        updateRecord(recordData)
        .then(result=>{this.showEvent('Sucess', 'Record Edited Successfully', 'success')})
        .catch(error=>{this.showEvent('Error', error.body.message, 'error')})
        .finally(()=>{this.isLoading=false;});
    }

    showEvent(title,message,vari){
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: vari
        }));
    }
}
