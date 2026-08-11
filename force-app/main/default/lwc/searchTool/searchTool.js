import { LightningElement, wire } from 'lwc';

import getSearchedAccounts from '@salesforce/apex/AccountController.getSearchedAccounts';

const colms = [
    
    {label: 'Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'text'},
    {label: 'Active', fieldName: 'Active__c'},
    {label: 'Industry', fieldName: 'Industry', type: 'text'},
    {label: 'Rating', fieldName: 'Rating', type: 'text'}
]
export default class SearchTool extends LightningElement {

    nameValue;
    accountRecords;
    cols = colms;
    showError = false;

    nameHandler(event){
        this.nameValue = event.target.value;
    }

    @wire(getSearchedAccounts, {name: '$nameValue'})
        wiredAccount({error,data}){
            if(data){
                this.accountRecords = data;
                if(this.accountRecords.length <= 0) this.showError = true;
            }
            else if(error){
                this.errors = (error.body.message);
                this.showError = true;
            }
        }

    // Id, Name, Rating, Industry, Phone, Active__c
    
}