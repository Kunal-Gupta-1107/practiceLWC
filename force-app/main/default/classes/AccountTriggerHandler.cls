public class AccountTriggerHandler {
    public static void updateRating(List<Account> accList){
        for(Account acc:accList){
            if(acc.Industry!= Null && acc.Industry=='Media'){
                acc.Rating='Hot';
            }
        }
    }
    public static void createContact(List<Account>accList){
        List<Contact> conList= new List<Contact>();
        for(Account acc:accList){
            Contact con = new Contact();
            con.LastName = acc.Name + ' LN';
            con.FirstName = acc.Name + ' FN';
            
            con.AccountId = acc.Id;
            conList.add(con);	
        }
        if(!conList.isEmpty()){
            insert conList;
        }
    }
    public static void updateConDescription(List<Account> accList, Map<Id,Account> oldAcc){
        Map<Id,Account> fetchedRecord = new Map<Id,Account>();
        for(Account acc:accList){
            if(acc.Phone != oldAcc.get(acc.Id).Phone) fetchedRecord.put(acc.Id,acc);
        }
        if(fetchedRecord.isEmpty()) return;
        
        List<Contact> conList = [SELECT Id, Description, Phone,AccountId from Contact where AccountId IN :fetchedRecord.keySet()];
        for(Contact con:conList){
            con.Phone=fetchedRecord.get(con.AccountId).Phone;
            con.Description = 'Phone Changed From '+ oldAcc.get(con.AccountId).Phone +' To '+  fetchedRecord.get(con.AccountId).Phone;
          
        }
        
        if(!conList.isEmpty()){
            update conList;
        }
    }
    //working good
    public static void updateOppoDescription(List<Account> accList, Map<Id,Account> oldAcc){
       Map<Id,Account> fetchedRecord = new Map<Id,Account>();
        for(Account acc:accList){
            if(acc.AnnualRevenue != oldAcc.get(acc.Id).AnnualRevenue) fetchedRecord.put(acc.Id,acc);
        }
        if(fetchedRecord.isEmpty()) return;
        
        List<Opportunity> oppoList = [SELECT Id, Description,AccountId FROM Opportunity Where AccountId IN: fetchedRecord.keySet()];
        for(Opportunity oppo:oppoList){
            oppo.Description = 'Account Annual Revenue updated to: $' + String.valueOf(fetchedRecord.get(oppo.AccountId).AnnualRevenue);
        }
        if(!oppoList.isEmpty()) update oppoList;
    }
    public static void nameChangeUpdateDesc(List<Account> accList,Map<Id,Account> idAccMap){
        for(Account acc:accList){
            if(acc.Name != idAccMap.get(acc.Id).Name) acc.Description = 'Phone Chnaged from ' + idAccMap.get(acc.Id).Name + ' to ' + acc.Name;
        }
    }
    
    public static void preventHighPriorityDeletion(List<Account> accList){
        for(Account acc: accList){
            if(acc.Rating == 'High')
            acc.addError('Account can not be deleted as it is high priority account');
        }
    }
    public static void preventParentAccountDeletion(Map<Id, Account> accMap){
        
        Map<Id, Integer> existingConsMap = new Map<Id, Integer>(); 
		for(AggregateResult agrCons: [Select AccountId accId, count(Id) totalCons from Contact group By AccountId]){ 
			existingConsMap.put((Id)agrCons.get('accId'), (Integer)agrCons.get('totalCons') );
		}   
        for(Account acc :accMap.values()){ 
			if(existingConsMap.containsKey(acc.Id) && existingConsMap.get(acc.Id)>0) 
				acc.addError('Can not delete having related Contacts!');
    	}
    }
    public static void preventActiveAccountDeletion(List<Account> accList){
        for(Account acc: accList){
            if(acc.Active__c == 'Yes') acc.addError('Active Account can not be deleted');
        }
    }
    //Methode 1 (Good but better exist)
    public static void preventAccountHasRelatedOppo(Map<id, Account> oldMapAcc){
        Map<Id, Integer> existingOppoMap = new Map<Id, Integer>();
        for(AggregateResult agrCons: [SELECT AccountId accId, count(Id) totalOppo from Opportunity where AccountId IN: oldMapAcc.keySet() group by AccountId]){
            existingOppoMap.put((Id)agrCons.get('accId'),(Integer)agrCons.get('totalOppo'));
        }
        for(Account acc : oldMapAcc.values()){
            if(existingOppoMap.containsKey(acc.Id) && existingOppoMap.get(acc.Id)>0)
                acc.addError('you cannot delete account Associated with any Opportunity');
        }
        
    }
    //Methode 2 (Worst)
    public static void preventAccountHasRelatedOppo2(Map<id, Account> oldMapAcc){
        Map<Id, Opportunity> IdMapOppo = new Map<Id,Opportunity>([SELECT Id, Name from Opportunity where AccountId IN: oldMapAcc.keySet()]);
        for(Opportunity opo:IdMapOppo.values()){
            oldMapAcc.get(opo.AccountId).addError('you cannot delete account Associated with any Opportunity');
        }
    }
    
    public static void createFollowUpTask(List<Account> accList){
        List<Task> taskList = new List<Task>();
        for(Account acc: accList){
            Task tk = new Task();
            tk.Subject = 'Follow up new Account';
            tk.WhatId = acc.Id;
            tk.OwnerId = acc.OwnerId;
            
            taskList.add(tk);
        }
        insert taskList;
    }
    
    // count Total Child Account 
    public static void countTotalChildAccount(Map<Id,Account> accMap){
        map<Id,Integer> idToIntMap = new Map<Id,Integer>();
        for(AggregateResult ag : [SELECT ParentId accId,count(Id) totalChildAcc from Account Where Id IN: accMap.keySet() group by ParentId]){
            idToIntMap.put((Id)ag.get('accId'),(Integer)ag.get('totalChildAcc'));
        }
    }
    public static void phoneValidator(List<Account> accList){
        for(Account acc:accList){
            if(acc.phone != Null && acc.phone.length() != 10){
                acc.phone.addError('Phone Must be of 10 Digit');
            }
        }
    }
    public static void defaultContact(List<Account> accList){
        List<Contact> conList = new List<Contact>();
        for(Account acc: accList) {
            Contact con = new Contact();
            con.LastName = acc.Name + 'LN';
            con.AccountId = acc.Id;
            con.Phone = acc.Phone;
            
            conList.add(con);
        }
        
        if(!conList.isEmpty()){
            insert conList;
        }
    }
    public static void preventDeletionIfConExist(Map<Id,Account> accMap){
        List<Contact> conList = [SELECT Id, AccountId From Contact Where Id IN: accMap.KeySet()];
        for(Contact con: conList){
            if(accMap.containsKey(con.AccountId)){
                Account acc = New Account(Id = con.AccountId);
                acc.AddError('Can not Delete');
            }
        }
    }
    
}