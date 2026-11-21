import Common "../types/common";
import Beaches "../types/beaches";

module {
  public type WarningId = Nat;

  public type WarningSeverity = {
    #info;
    #advisory;
    #warning;
    #danger;
  };

  public type Warning = {
    id : WarningId;
    beachId : ?Beaches.BeachId;
    messageEn : Text;
    messageFa : Text;
    severity : WarningSeverity;
    issuedAt : Common.Timestamp;
    published : Bool;
  };
};
