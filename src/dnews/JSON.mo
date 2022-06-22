import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat16 "mo:base/Nat16";
import Text "mo:base/Text";
import Time "mo:base/Time";

module {
    public type Json = Text;

    func quote(text : Text) : Text {
        "\"" # text # "\""
    };

    // convert array to JSON
    public func array<T>(jsonify : T -> Json) : [T] -> Json {
        func (obj : [T]) : Json {
            "[" # 
                Text.join(",", Iter.map(Iter.fromArray(obj), jsonify)) #
            "]"
        }
    };

    // convert object to JSON
    public func obj(properties : [(Text, Json)]) : Json {
        "{" #
            Text.join(",",
                Iter.map(Iter.fromArray(properties), func ((key : Text, value : Json)) : Json {
                    text(key) # ":" # value
                })
            ) #
        "}"
    };

    public func text(text : Text) : Json {
        quote(
            Text.replace(
            Text.replace(
            Text.replace(
            Text.replace(
            Text.replace(text,
            #char '\"', "\\\""),
            #char '\\' , "\\\\"),
            #char '\n' , "\\n"),
            #char '\r' , "\\r"),
            #char '\t' , "\\t")
        )
    };