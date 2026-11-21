module {
  public type Timestamp = Int;

  public type Error = {
    #notAuthorized;
    #notFound;
    #invalidInput : Text;
  };

  public type Result<T> = {
    #ok : T;
    #err : Error;
  };
};
