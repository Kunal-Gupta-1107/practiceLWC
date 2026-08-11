import { LightningElement } from 'lwc';
import getSearchedAccounts from '@salesforce/apex/AccountController.getSearchedAccounts';

const colms = [
    {label: 'Id', fieldName: 'Id'},
    {label: 'Industry', fieldName: 'Industry', type: 'text'},
    {label: 'Rating', fieldName: 'Rating', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone'}
]
export default class SearchToolUpgrade extends LightningElement {

    nameValue = '';
    recordData;
    cols = colms;
    noRecord=false;
    isLoading=false;
    errorMsg;

    nameHanlder(event){
        this.nameValue = event.target.value;
        this.noRecord = false;
        this.recordData = undefined;
    }

    searchHandler(event){
        this.isLoading = true;
        if(!this.nameValue.trim()){
            this.isLoading = false;
            this.recordData = undefined;
            return;
        }
        getSearchedAccounts({ name: this.nameValue }).then(result=>{
            this.recordData = result;
            if(this.recordData.length <= 0) this.noRecord = true;
        }).catch(error=>{
            this.noRecord = true;
            this.errorMsg = error.body.message;
        }).finally(()=>{
            this.isLoading = false;
        })
    }
}