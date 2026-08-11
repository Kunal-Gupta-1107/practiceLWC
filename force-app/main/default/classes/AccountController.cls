public class AccountController {

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(String rating) {
        return [SELECT Id, Name, Rating, Industry, Phone, Active__c FROM Account where Rating = :rating and Rating != null];
    }

    @AuraEnabled(cacheable = true)
    public static List<Contact> getRelCon(String accId){
        return [SELECT Id, FirstName, LastName, Phone, Email, Title,AccountId From Contact Where AccountId = :accId];
    }
}