import { api, LightningElement } from 'lwc';
import Account_Object from '@salesforce/schema/Account';
import Account_Name from '@salesforce/schema/Account.Name';
import Account_Phone from '@salesforce/schema/Account.Phone';
import Account_AnnualRevenue from '@salesforce/schema/Account.AnnualRevenue';
import Account_Fax from '@salesforce/schema/Account.Fax';
import Account_Industry from '@salesforce/schema/Account.Industry';
import Account_Rating from '@salesforce/schema/Account.Rating';

export default class RecordzCustomForm extends LightningElement {
    
    @api recordId;

    objApiName = Account_Object;
    myFields = [Account_Name,Account_Phone,Account_AnnualRevenue,Account_Fax,Account_Industry,Account_Rating];
} 