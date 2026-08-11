import { LightningElement,api } from 'lwc';

import Case_Obj from '@salesforce/schema/Case';
import Case_Subject from '@salesforce/schema/Case.Subject';
import Case_Description from '@salesforce/schema/Case.Description';
import Case_Status from '@salesforce/schema/Case.Status';
import Case_Priority from '@salesforce/schema/Case.Priority';


export default class DynamicRecordViewForm extends LightningElement {
    @api recordId;

    fields = {
        subject: Case_Subject,
        description: Case_Description,
        status: Case_Status,
        priority: Case_Priority
    }
}