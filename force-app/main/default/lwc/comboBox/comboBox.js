import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

import ACCOUNT from '@salesforce/schema/Account';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';



const columns = [
    {label: 'Name', fieldName: 'Name', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'text'},
    {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency'},
    {label: 'Fax', fieldName: 'Fax', type: 'text'},
    {label: 'Industry', fieldName: 'Industry', type: 'text'},
    {label: 'Rating', fieldName: 'Rating', type: 'text'}
];

export default class ComboboxLWC extends LightningElement {
    ratingValues = '';
    ratingOptions = [];
    error;
    accountRecords;
    cols = columns;

    handleChange(event){
        this.ratingValues = event.target.value;
    }

    @wire(getObjectInfo, {objectApiName: ACCOUNT}) accountObjInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$accountObjInfo.data.defaultRecordTypeId' , 
        fieldApiName: ACCOUNT_RATING }) 
        accountRatings({data, error}){
            if(data){
                this.ratingOptions = data.values;
            }else if(error){
                console.log(error.body.message);
            }
        }

    @wire(getAccounts, {rating: '$ratingValues'}) accounts({data, error}){
        if(data){
            this.accountRecords = data;

        }else if(error){
            console.log(error.body.message);
        }
    };
}