import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACC from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import DESCRIPTION_FIELD from '@salesforce/schema/Account.Description';
import { createRecord } from 'lightning/uiRecordApi';

//new 
export default class ImperativeInsertionUsingApi extends LightningElement {
    name = '';
    rating = '';                    // Reminder 
    phone = '';                     // {} is for Object
    industry = '';
    description = '';
    isLoading = false;

    nameHandler(event){
        this.name = event.target.value;
    }
    ratingHandler(event){
        this.rating = event.target.value;
    }
    phoneHandler(event){
        this.phone = event.target.value;
    }
    industryHandler(event){
        this.industry = event.target.value;
    }
    descriptionHandler(event){
        this.description = event.target.value;
    }

    buttonHandler(event){
        this.isLoading = true;
        if(!this.name){
            this.ShowToast('Error', 'Enter Account Name','error');
            this.isLoading = false;
            return;
        }

        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[RATING_FIELD.fieldApiName] = this.rating;
        fields[INDUSTRY_FIELD.fieldApiName] = this.industry;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;

        const recordData = {apiName:ACC.objectApiName, fields};
        createRecord(recordData)
        .then(result=>{
            this.ShowToast('Success', 'Record Created Sucessfully','success')
            this.resetFields();
        })
        .catch(error=>{
            const errorMessage = error.body ? error.body.message : 'An error occurred while creating the record.';
            this.ShowToast('Error', errorMessage, 'error');
        })
        .finally(() => {
            this.isLoading = false;
        });
    }

    resetFields() {
        this.name = '';
        this.rating = '';
        this.phone = '';
        this.industry = '';
        this.description = '';
    }
    ShowToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }));
    }
}