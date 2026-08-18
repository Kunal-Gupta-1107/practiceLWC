public with sharing class Solutions {
    public static void totalCaseCountOnAcc(List<Case> caseList, Map<Id, Case> oldCaseMap){
        Set<Id> accIds = new Set<Id>();
        for(Case cs: caseList){
            if(oldCaseMap == Null && cs.AccountId != Null){
                accIds.add(cs.AccountId);
            }
            else if(cs.AccountId != oldCaseMap.get(cs.Id).AccountId){
                if(cs.AccountId != Null) accIds.add(cs.AccountId);
                if(oldCaseMap.get(cs.Id).AccountId != Null) accIds.add(oldCaseMap.get(cs.Id).AccountId);
            }
        }
        if(accIds.isEmpty()) return;
        Map<Id, Integer> accMap = new Map<Id, Integer>();
        for(AggregateResult ag: [SELECT AccountId accId ,Count(Id) totalCase from Case Where AccountId IN :accIds group by AccountId]){
            accMap.put((Id)ag.get('accId'), (Integer)ag.get('totalCase'));
        }

        List<Account> recordsToUpdate = new List<Account>();
        for(Id i: accIds){
            Integer total = accMap.containsKey(i) ? accMap.get(i) : 0 ;
            Account ac = new Account(Id = i);
                    ac.Total_Case_Count__c = total;
            recordsToUpdate.add(ac);
        }

        if(!recordsToUpdate.isEmpty()) update recordsToUpdate;
    }
}