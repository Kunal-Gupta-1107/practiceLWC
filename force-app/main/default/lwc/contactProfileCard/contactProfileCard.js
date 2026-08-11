import { LightningElement, api, wire } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';

import CONTACT_FNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
import CONTACT_TITLE from '@salesforce/schema/Contact.Title';
import CONTACT_DEPARTMENT from '@salesforce/schema/Contact.Department';
import CONTACT_ACCOUNTNAME from '@salesforce/schema/Contact.Account.Name';
import CONTACT_SALUTATION from '@salesforce/schema/Contact.Salutation';
// import CONTACT_NAME from '@salesforce/schema/Contact.Name';

const fields = [ CONTACT_FNAME, CONTACT_LNAME, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TITLE, CONTACT_DEPARTMENT, CONTACT_ACCOUNTNAME, CONTACT_SALUTATION];

export default class ContactProfileCard extends LightningElement {
    @api recordId;

    @wire(getRecord, {recordId: '$recordId', fields: fields }) contactRecord;

    get name(){
        return `${getFieldValue(this.contactRecord.data, CONTACT_FNAME || '' )} ${getFieldValue(this.contactRecord.data, CONTACT_LNAME || '' )}`;
    }

    get salutation(){
        return getFieldValue(this.contactRecord.data, CONTACT_SALUTATION || '' );
        
    }

    get phone(){
        return getFieldValue(this.contactRecord.data, CONTACT_PHONE || '' );
        
    }

    get title(){
        return getFieldValue(this.contactRecord.data, CONTACT_TITLE || '' );
    }

    get email(){
        return getFieldValue(this.contactRecord.data, CONTACT_EMAIL || '' );
        
    }
    get department(){
        return getFieldValue(this.contactRecord.data, CONTACT_DEPARTMENT || '' );
        
    }
    get account(){
        return getFieldValue(this.contactRecord.data, CONTACT_ACCOUNTNAME || '' );
        
    }
    // get fullName(){
    //     return getFieldValue(this.contactRecord.data, CONTACT_NAME || '' );
    // }
}
