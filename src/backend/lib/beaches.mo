import Map "mo:core/Map";
import Types "../types/beaches";

module {
  public func listBeaches(beaches : Map.Map<Types.BeachId, Types.Beach>) : [Types.Beach] {
    beaches.values().toArray();
  };

  public func getBeach(beaches : Map.Map<Types.BeachId, Types.Beach>, id : Types.BeachId) : ?Types.Beach {
    beaches.get(id);
  };

  public func addBeach(
    beaches : Map.Map<Types.BeachId, Types.Beach>,
    nextId : { var value : Nat },
    nameEn : Text,
    nameFa : Text,
    latitude : Float,
    longitude : Float,
    descriptionEn : Text,
    descriptionFa : Text,
  ) : Types.Beach {
    let id = nextId.value;
    nextId.value := id + 1;
    let beach : Types.Beach = {
      id;
      nameEn;
      nameFa;
      latitude;
      longitude;
      descriptionEn;
      descriptionFa;
      active = true;
    };
    beaches.add(id, beach);
    beach;
  };

  public func updateBeach(
    beaches : Map.Map<Types.BeachId, Types.Beach>,
    id : Types.BeachId,
    nameEn : Text,
    nameFa : Text,
    latitude : Float,
    longitude : Float,
    descriptionEn : Text,
    descriptionFa : Text,
    active : Bool,
  ) : ?Types.Beach {
    switch (beaches.get(id)) {
      case null { null };
      case (?_) {
        let updated : Types.Beach = {
          id;
          nameEn;
          nameFa;
          latitude;
          longitude;
          descriptionEn;
          descriptionFa;
          active;
        };
        beaches.add(id, updated);
        ?updated;
      };
    };
  };
};
