import Char "mo:base/Char";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Nat32 "mo:base/Nat32";


module {
    public type HeaderField = (Text, Text);

    public type Request = {
        method : Text;
        url : Text;
        headers : [HeaderField];
        body : [Nat8];
    };

    public type Response = {
        status_code : Nat16;
        headers : [HeaderField];
        body : [Nat8];
    };

    public func textToNat8s(text : Text) : [Nat8] {
        Iter.toArray(Iter.map(text.chars(), func (char : Char) : Nat8 {
            Nat8.fromNat(Nat32.toNat(Char.toNat32(char)))
        }))
    };
}