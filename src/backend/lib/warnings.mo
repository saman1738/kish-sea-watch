import Map "mo:core/Map";
import Types "../types/warnings";

module {
  public func listPublishedWarnings(warnings : Map.Map<Types.WarningId, Types.Warning>) : [Types.Warning] {
    warnings.values().toArray().filter(func(w) = w.published);
  };

  public func listAllWarnings(warnings : Map.Map<Types.WarningId, Types.Warning>) : [Types.Warning] {
    warnings.values().toArray();
  };

  public func createWarning(
    warnings : Map.Map<Types.WarningId, Types.Warning>,
    nextId : { var value : Nat },
    beachId : ?Nat,
    messageEn : Text,
    messageFa : Text,
    severity : Types.WarningSeverity,
    issuedAt : Int,
    published : Bool,
  ) : Types.Warning {
    let id = nextId.value;
    nextId.value := id + 1;
    let warning : Types.Warning = {
      id;
      beachId;
      messageEn;
      messageFa;
      severity;
      issuedAt;
      published;
    };
    warnings.add(id, warning);
    warning;
  };

  public func setWarningPublished(
    warnings : Map.Map<Types.WarningId, Types.Warning>,
    id : Types.WarningId,
    published : Bool,
  ) : ?Types.Warning {
    switch (warnings.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Warning = { existing with published };
        warnings.add(id, updated);
        ?updated;
      };
    };
  };
};
