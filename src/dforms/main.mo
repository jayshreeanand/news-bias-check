import Map "mo:base/HashMap";
import Text "mo:base/Text";
import List "mo:base/List";
import Iter "mo:base/Iter";

actor {

  type Name = Text;
  type Phone = Text;
  type Domain = Text;

  type Entry = {
    desc: Text;
    phone: Phone;
  };

  type NewsSource = {
    bias: Text;
    accuracy: Text;
    domain: Text;
    source: Text;
  };

  let NewsSources = Map.HashMap<Domain, NewsSource>(0, Text.equal, Text.hash);

  public func insert(domain : Text, bias: Text, accuracy: Text, source: Text): async () {
    let newsSource : NewsSource = {
      bias = bias;
      accuracy = accuracy;
      domain = domain;
      source = source;
    };
    NewsSources.put(domain, newsSource);
  };

  public query func lookup(domain : Text) : async ?NewsSource {
    NewsSources.get(domain)
  };

  public query func getNewsSources() : async List.List<(Domain, NewsSource)> {
    Iter.toList(NewsSources.entries())
  };

  let phonebook = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);

  public func insertOld(name : Name, entry : Entry): async () {
    phonebook.put(name, entry);
  };

  public query func lookupOld(name : Name) : async ?Entry {
    phonebook.get(name)
  };

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
