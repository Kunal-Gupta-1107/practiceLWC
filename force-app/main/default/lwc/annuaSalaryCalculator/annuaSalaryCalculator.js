import { LightningElement } from 'lwc';

export default class AnnuaSalaryCalculator extends LightningElement {
    annualSalary=0;
    inputSalary;
    isLoading=false;
    
    inputHandler(event){
        this.inputSalary = event.target.value;
    }

    buttonHandler(event){
        this.isLoading = true;
        this.annualSalary = !isNaN(this.inputSalary) ? parseInt(this.inputSalary, 10)*12 : 'NaN';
        this.isLoading = false;
    }
}