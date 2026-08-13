public class AccountController {

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(String rating) {
        return [SELECT Id, Name, Rating, Industry, Phone, Active__c FROM Account where Rating = :rating and Rating != null];
    }

    @AuraEnabled(cacheable = true)
    public static List<Contact> getRelCon(String accId){
        return [SELECT Id, FirstName, LastName, Phone, Email, Title,AccountId From Contact Where AccountId = :accId];
    }

    @AuraEnabled(cacheable = true)
    public static List<Account> getSearchedAccounts(String name) {
        String named = '%'+ name + '%';
        return [SELECT Id, Name, Rating, Industry, Phone, Active__c FROM Account where Name Like :named];
    }

    public class wrapper{
        @AuraEnabled public String stageName;
        @AuraEnabled public Decimal amount;
        
        public wrapper(String stageName, Decimal amount){
            this.stageName = stageName;
            this.amount = amount;
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<wrapper> getOpps(){
        List<wrapper> opps = new List<wrapper>();
        for(AggregateResult ar : [SELECT stageName, sum(amount) from Opportunity where LastModifiedDate = LAST_N_DAYS:30 group by StageName]){
            opps.add(new wrapper((String)ar.get('StageName'), (Decimal)ar.get('total')));
        }
        return opps;
    }
}