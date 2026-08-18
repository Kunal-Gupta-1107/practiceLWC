public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accId) {
        //throw new AuraHandledException('Forced error for Trailhead');
        if(accId == Null)return new List<Contact>();
        return [SELECT Id, FirstName, LastName, Email, Phone FROM Contact Where AccountId = :accId order by LastName];
    }
}