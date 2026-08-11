import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import Lead_Obj from '@salesforce/schema/Lead';
import Lead_Status from '@salesforce/schema/Lead.Status';
import Lead_Source from '@salesforce/schema/Lead.LeadSource';
import Lead_Industry from '@salesforce/schema/Lead.Industry';

export default class LeadQualificationForm extends LightningElement {

    
    statusValue = '';
    statusOptions = [];

    sourceValue = '';
    sourceOptions = [];
    
    industryValue = '';
    industryOptions = [];

    statusHandler(event){
       this.statusValue = event.target.value;
    }
    sourceHandler(event){
        this.sourceValue = event.target.value;
    }
    industryHandler(event){
        this.industryValue = event.target.value;
    }

    @wire(getObjectInfo, {objectApiName: Lead_Obj}) leadObjInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$leadObjInfo.data.defaultRecordTypeId' , 
        fieldApiName: Lead_Status }) 
        leadStatus({data, error}){
            if(data){
                this.statusOptions = data.values;
            }else if(error){
                window.alert(error.body.message);
            }
        }
    @wire(getPicklistValues, {
        recordTypeId: '$leadObjInfo.data.defaultRecordTypeId' , 
        fieldApiName: Lead_Source }) 
        leadSource({data, error}){
            if(data){
                this.sourceOptions = data.values;
            }else if(error){
                window.alert(error.body.message);
            }
        }
    @wire(getPicklistValues, {
        recordTypeId: '$leadObjInfo.data.defaultRecordTypeId' , 
        fieldApiName: Lead_Industry }) 
        leadIndustry({data, error}){
            if(data){
                this.industryOptions = data.values;
            }else if(error){
                window.alert(error.body.message);
            }
        }

    successHandler(event){
        const toast = new ShowToastEvent({
            title: 'Success',
            message: 'Record Saved Successfully🥳',
            variant: 'Success'
        });
        

        this.dispatchEvent(toast);
    }
}