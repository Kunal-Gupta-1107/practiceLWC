public class ContactTriggerHandler {
    //Need Improvment
    public static void countRelatedContact(List<Contact> conList, Map<Id, Contact> oldconMap){
        Set<Id> accIds = new Set<Id>();
        //Wrong
        //if(!conList.isEmpty() &&  conList != Null){ 
        if(conList != Null &&  !conList.isEmpty()){    
        	for(Contact con:conList){
            	if(con.AccountId != Null) accIds.add(con.AccountId);
        	}
        }
        //Why Null, even we are using isEmpty() (is it like Black and Null)??
        //if(!oldconMap.isEmpty() &&  oldconMap != Null){
        if(oldconMap != Null &&  !oldconMap.isEmpty()){ 
            for(Contact con:oldconMap.values()){
                if(con.AccountId != Null) accIds.add(con.AccountId);
            }
        }
        
        if(accIds.isEmpty()) return;
        //Aggregate Result can improve it
        List<Account> accList = [SELECT Id, Name,(SELECT Id FROM Contacts) FROM Account Where Id IN :accIds];
        for(Account acc:accList){
            acc.Total_Contacts__c = acc.Contacts.size();
        }
        if(!accList.isEmpty()) {
            update accList;
        }
    }
    // Improved Version 27-6 //Didn't worked Re-written below
    // Total Related Contact Count on Account
    		
    //Improved 28-6
    public static void imrovedCountRelatedContact(List<Contact> conList, Map<Id, Contact> oldConMap){
        
        Set<Id> accIds = New Set<Id>();
        if(conList == Null || (conList != Null && oldConMap != Null && !oldConMap.isEmpty())){
            
            for (Contact con : oldConMap.values()) {
    			if (con.AccountId != null) accIds.add(con.AccountId);
    		}
        }
        
        if(conList != Null && !conList.isEmpty()){
            for(Contact con:conList){
                if(con.AccountId != Null) accIds.add(con.AccountId);
            }
        }
        
        if(accIds.isEmpty()) return;
        
        Map<Id,Integer> accMap = new Map<Id,Integer>();
        
        for(AggregateResult ar : [Select AccountId accId, count(Id) totalCon from Contact where AccountId IN :accIds  Group by AccountId]){
            accMap.put((Id)ar.get('accId'), (integer)ar.get('totalCon'));
        }
        
        List<Account> accToUpdate = new List<Account>();
        for(Id accountId : accIds){
            Integer countRelCon = accMap.containsKey(accountId) ? accMap.get(accountId) : 0 ;
            
            Account acc = new Account(Id = accountId);
                acc.Total_Contacts__c = countRelCon;
                accToUpdate.add(acc);
    	}
        
        if(!accToUpdate.isEmpty()) Update accToUpdate;
    }
    
    public static void preventRecentConDeletion(List<Contact> conList){
        for(Contact con:conList){
            if((con.CreatedDate >= System.now().addDays(-7))){ //look the loop has to calculate it at each iteration (dfine outside loop and become super)
                con.addError('Recently Created Contacts can not be deleted');
            }
        }
    }
    public static void stopOtherFromDeletingContact(List<Contact> conList){
        for(Contact con:conList){
            if(con.OwnerId != UserInfo.getUserId()){
                con.addError('Only Owner can delete there records');
            }
        }
    }
    
    public static void countTotalCon(List<Contact> conList , Map<Id,Contact> IdConMap){
        Set<Id> accountIds = New Set<Id>();
        for(Contact con: conList){
            if(IdConMap == Null && con.AccountId != Null){
                accountIds.add(con.accountId);
            }
            else{
                if(con.AccountId != IdConMap.get(con.Id).AccountId){
                    if(con.AccountId != Null){
                		accountIds.add(con.accountId);        
                    }
                    if(IdConMap.get(con.Id).AccountId != Null){
                        accountIds.add(IdConMap.get(con.Id).AccountId);
                    }
                }
            }
        }
        
        Map<Id,Integer> idToIntegerMap = New Map<Id,Integer>();
        for(AggregateResult ag : [SELECT AccountId accId, count(Id) totalCon From Contact Where AccountId IN: accountIds group by AccountId]){
            idToIntegerMap.put((Id)ag.get('accId'), (Integer)ag.get('totalCon'));
        }
        List<Account> recToUpdate = New List<Account>();
        for(Id accIds : accountIds){
            Integer totalContact = idToIntegerMap.containsKey(accIds) ? idToIntegerMap.get(accIds) : 0;
            
            
            Account acc = New Account(Id = accIds);
            acc.Total_Child_Count__c = totalContact;
            
            recToUpdate.add(acc);
        }
        if(!recToUpdate.isEmpty()){
            update recToUpdate;
        }
    }
   	

    
}