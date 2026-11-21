import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/beaches";
import BeachesLib "../lib/beaches";
import Seed "../beaches";

mixin (
  accessControlState : AccessControl.AccessControlState,
  beaches : Map.Map<Types.BeachId, Types.Beach>,
  nextBeachId : { var value : Nat },
) {
  public query func listBeaches() : async [Types.Beach] {
    BeachesLib.listBeaches(beaches);
  };

  public query func getBeach(id : Types.BeachId) : async ?Types.Beach {
    BeachesLib.getBeach(beaches, id);
  };

  public shared ({ caller }) func addBeach(
    nameEn : Text,
    nameFa : Text,
    latitude : Float,
    longitude : Float,
    descriptionEn : Text,
    descriptionFa : Text,
  ) : async Common.Result<Types.Beach> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err(#notAuthorized);
    };
    #ok(BeachesLib.addBeach(beaches, nextBeachId, nameEn, nameFa, latitude, longitude, descriptionEn, descriptionFa));
  };

  public shared ({ caller }) func updateBeach(
    id : Types.BeachId,
    nameEn : Text,
    nameFa : Text,
    latitude : Float,
    longitude : Float,
    descriptionEn : Text,
    descriptionFa : Text,
    active : Bool,
  ) : async Common.Result<Types.Beach> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err(#notAuthorized);
    };
    switch (BeachesLib.updateBeach(beaches, id, nameEn, nameFa, latitude, longitude, descriptionEn, descriptionFa, active)) {
      case null { #err(#notFound) };
      case (?beach) { #ok(beach) };
    };
  };

  public shared func ensureBeachesSeeded() : async () {
    Seed.ensureSeeded(beaches, nextBeachId);
  };
};
