import { LightningElement } from 'lwc';

export default class CreateEventpart2 extends LightningElement {

    employeeName;
    employeeAge;
    employeeSalary;
    employeeDescription;

    handlerEmployeeData(event){
        this.employeeName = event.detail.empname;
        this.employeeAge = event.detail.empage;
        this.employeeSalary = event.detail.empsal;
        this.employeeDescription = event.detail.empdesc;
    }
}