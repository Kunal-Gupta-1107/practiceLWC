import { LightningElement } from 'lwc';

export default class CreateEventTestpart1 extends LightningElement {

    name;
    age;
    salary;
    description;

    nameHandler(event){
        this.name = event.target.value;
    }
    ageHandler(event){  
        this.age = event.target.value;
    }
    salaryHandler(event){
        this.salary = event.target.value;
    }
    descHandler(event){
        this.description = event.target.value;
    }
    buttonHandler(event){
        this.dispatchEvent(new CustomEvent('enployeedata',{detail:{empname:this.name ,empage:this.age ,empsal:this.salary ,empdesc:this.description}}));
        
    }
}