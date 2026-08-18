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

    public static void updateTotalAmountOnAccount(List<Opportunity> oppoList, Map<Id,Opportunity> oppoMap){
        Set<Id> accIds = new Set<Id>();
        for(Opportunity oppo: oppoList){
            if(oppoMap == Null){
                if(oppo.Amount != Null && oppo.AccountId != Null){
                    accIds.add(oppo.AccountId);
                }
            }
            else if((oppo.Amount != oppoMap.get(oppo.Id).Amount || oppo.AccountId != oppoMap.get(oppo.Id).AccountId)){
                if(oppo.AccountId != Null) accIds.add(oppo.AccountId);
                if(oppoMap.get(oppo.Id).AccountId != Null) accIds.add(oppoMap.get(oppo.Id).AccountId);
            }
        }
        if(accIds.isEmpty()) return;
        Map<Id,Decimal> idToIntMap = Map<Id,Decimal>();
        for(AggregateResult ag:[SELECT AccountId accId, sum(Amount) totalAmount from Opportunity Where AccountId IN :accIds group by AccountId]){
            idToIntMap.put((Id)ag.get('accId'),(Decimal)ag.get('totalAmount'));
        }

        List<Account> accToUpdate = New List<Account>();
        for(Id i:accIds){
            Decimal total = idToIntMap.containsKey(i) ? idToIntMap.get(i) : 0; 
            Account acc = new Account(Id = i);
                    acc.max_value__c = total;
                    accToUpdate.add(acc);
        }

        if(!accToUpdate.isEmpty()) update accToUpdate;
    }
}