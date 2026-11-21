import Map "mo:core/Map";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/warnings";
import WarningsLib "../lib/warnings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  warnings : Map.Map<Types.WarningId, Types.Warning>,
  nextWarningId : { var value : Nat },
) {
  public query func listPublishedWarnings() : async [Types.Warning] {
    WarningsLib.listPublishedWarnings(warnings);
  };

  public query ({ caller }) func listAllWarnings() : async Common.Result<[Types.Warning]> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err(#notAuthorized);
    };
    #ok(WarningsLib.listAllWarnings(warnings));
  };

  public shared ({ caller }) func createWarning(
    beachId : ?Nat,
    messageEn : Text,
    messageFa : Text,
    severity : Types.WarningSeverity,
    published : Bool,
  ) : async Common.Result<Types.Warning> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err(#notAuthorized);
    };
    let warning = WarningsLib.createWarning(
      warnings,
      nextWarningId,
      beachId,
      messageEn,
      messageFa,
      severity,
      Time.now(),
      published,
    );
    #ok(warning);
  };

  public shared ({ caller }) func setWarningPublished(
    id : Types.WarningId,
    published : Bool,
  ) : async Common.Result<Types.Warning> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err(#notAuthorized);
    };
    switch (WarningsLib.setWarningPublished(warnings, id, published)) {
      case null { #err(#notFound) };
      case (?warning) { #ok(warning) };
    };
  };
};
