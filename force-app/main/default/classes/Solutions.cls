public with sharing class Solutions {
    public static void totalCaseCountOnAcc(List<Case> caseList, Map<Id, Case> oldCaseMap){
        Set<Id> accIds = new Set<Id>();

        for(Case cs: caseList){
            if(oldCaseMap == null && cs.AccountId != Null) accIds.add(cs.AccountId);
            else if(cs.AccountId != oldCaseMap.get(cs.Id).AccountId){
                if(cs.AccountId != Null) accIds.add(cs.AccountId);
                if(oldCaseMap.get(cs.Id).AccountId != Null) accIds.add(oldCaseMap.get(cs.Id).AccountId);
            }
        }
        if(accIds.isEmpty()) return;
        Map<Id,Account> accMap = new Map<Id,Account>();
        for(Id i:accIds){
            Account ac= new Account(Id = i);
                    ac.Total_No_of_Cases__c = 0;
                    accMap.put(ac.Id, ac);
        }
        if(accMap.isEmpty()) return;
        for(AggregateResult ag: [SELECT AccountId i, Count(Id) totalCase From Case Where AccountId IN :accIds group by AccountId]){
            Id accId = (Id)ag.get('i');
            Integer total = (Integer)ag.get('totalCase');
            if(accMap.containsKey(accId)){
                accMap.get(accId).Total_No_of_Cases__c = total;
            }
        }
        if(!accMap.isEmpty()) update accMap.values();
    }
    
}