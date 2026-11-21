module {
  public type BeachId = Nat;

  public type Beach = {
    id : BeachId;
    nameEn : Text;
    nameFa : Text;
    latitude : Float;
    longitude : Float;
    descriptionEn : Text;
    descriptionFa : Text;
    active : Bool;
  };
};
