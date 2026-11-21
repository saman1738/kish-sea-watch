import Common "../types/common";
import Beaches "../types/beaches";

module {
  public type ReportId = Nat;

  public type ReportKind = {
    #roughWater;
    #calmWater;
    #strongCurrents;
    #waterClarity;
    #jellyfish;
    #unusualWaves;
    #otherHazard;
  };

  public type ReviewStatus = {
    #unverified;
    #verified;
    #dismissed;
  };

  public type Report = {
    id : ReportId;
    beachId : Beaches.BeachId;
    kind : ReportKind;
    note : Text;
    submittedAt : Common.Timestamp;
    status : ReviewStatus;
    reviewedAt : ?Common.Timestamp;
  };
};
