import Map "mo:core/Map";
import Types "../types/reports";

module {
  public func listReports(reports : Map.Map<Types.ReportId, Types.Report>) : [Types.Report] {
    reports.values().toArray();
  };

  public func listReportsForBeach(
    reports : Map.Map<Types.ReportId, Types.Report>,
    beachId : Nat,
  ) : [Types.Report] {
    reports.values().toArray().filter(func(r) = r.beachId == beachId);
  };

  public func submitReport(
    reports : Map.Map<Types.ReportId, Types.Report>,
    nextId : { var value : Nat },
    beachId : Nat,
    kind : Types.ReportKind,
    note : Text,
    submittedAt : Int,
  ) : Types.Report {
    let id = nextId.value;
    nextId.value := id + 1;
    let report : Types.Report = {
      id;
      beachId;
      kind;
      note;
      submittedAt;
      status = #unverified;
      reviewedAt = null;
    };
    reports.add(id, report);
    report;
  };

  public func reviewReport(
    reports : Map.Map<Types.ReportId, Types.Report>,
    id : Types.ReportId,
    status : Types.ReviewStatus,
    reviewedAt : Int,
  ) : ?Types.Report {
    switch (reports.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Report = {
          existing with
          status;
          reviewedAt = ?reviewedAt;
        };
        reports.add(id, updated);
        ?updated;
      };
    };
  };
};
