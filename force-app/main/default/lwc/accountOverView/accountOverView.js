import { api, LightningElement, wire } from 'lwc';

import { getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';
import Acc from '@salesforce/schema/Account';

import AccName  from '@salesforce/schema/Account.Name';
import AccType  from '@salesforce/schema/Account.Type';
import AccIndustry  from '@salesforce/schema/Account.Industry';
import AccPhone  from '@salesforce/schema/Account.Phone';
import AccWebsite  from '@salesforce/schema/Account.Website';
import AccOwnerId  from '@salesforce/schema/Account.OwnerId';
import AccNumberOfEmployees  from '@salesforce/schema/Account.NumberOfEmployees';
import AccAnnualRevenue  from '@salesforce/schema/Account.AnnualRevenue';
import AccActive__c  from '@salesforce/schema/Account.Active__c';
import AccRating  from '@salesforce/schema/Account.Rating';

export default class AccountOverView extends LightningElement {

}