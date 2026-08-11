import { api, LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi'; 

import Account_Object from '@salesforce/schema/Account';
import Account_Name from '@salesforce/schema/Account.Name';
import Account_Phone from '@salesforce/schema/Account.Phone';
import Account_Email__c from '@salesforce/schema/Account.Email__c';
import Account_Industry from '@salesforce/schema/Account.Industry';
import Account_Rating from '@salesforce/schema/Account.Rating';
import Account_AnnualRevenue from '@salesforce/schema/Account.AnnualRevenue';
import Account_Website from '@salesforce/schema/Account.Website';

export default class Lwc_Scenerio_3 extends LightningElement {
    @api recordId;
    ratingIndicator = false;
    objApiName = Account_Object;
    myFields = [Account_Name,Account_Phone,Account_Email__c,Account_Industry,Account_Rating,Account_AnnualRevenue,Account_Website];

    @wire(getRecord, { recordId: '$recordId', fields: [Account_Rating] })
    wiredAccount({ error, data }) {
        if (data) {
            let currentRating = getFieldValue(data, Account_Rating);
            
            if (currentRating === 'Hot') {
                this.ratingIndicator = true;
            } else {
                this.ratingIndicator = false;
            }
        } else if (error) {
            console.error('Error fetching record', error);
        }
    }
}