import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/reports";
import ReportsLib "../lib/reports";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reports : Map.Map<Types.ReportId, Types.Report>,
  nextReportId : { var value : Nat },
) {
  public query func listReports() : async [Types.Report] {
    ReportsLib.listReports(reports);
  };

  public query func listReportsForBeach(beachId : Nat) : async [Types.Report] {
    ReportsLib.listReportsForBeach(reports, beachId);
  };

  public shared ({ caller }) func submitReport(
    beachId : Nat,
    kind : Types.ReportKind,
    note : Text,
  ) : async Common.Result<Types.Report> {
    if (caller.isAnonymous()) {
      return #err(#notAuthorized);
    };
    let report = ReportsLib.submitReport(reports, nextReportId, beachId, kind, note, Time.now());
    #ok(report);
  };

  public shared ({ caller }) func reviewReport(
    id : Types.ReportId,
    status : Types.ReviewStatus,
  ) : async Common.Result<Types.Report> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err(#notAuthorized);
    };
    switch (ReportsLib.reviewReport(reports, id, status, Time.now())) {
      case null { #err(#notFound) };
      case (?report) { #ok(report) };
    };
  };
};
