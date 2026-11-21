import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import OQL "mo:caffeineai-oql";
import Expose "mo:caffeineai-oql/Expose";
import MapEntity "mo:caffeineai-oql/MapEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import FloatValue "mo:caffeineai-oql/FloatValue";
import BoolValue "mo:caffeineai-oql/BoolValue";
import BeachTypes "types/beaches";
import ReportTypes "types/reports";
import WarningTypes "types/warnings";
import BeachesApi "mixins/beaches-api";
import ReportsApi "mixins/reports-api";
import WarningsApi "mixins/warnings-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let beaches : Map.Map<BeachTypes.BeachId, BeachTypes.Beach>;
  let nextBeachId : { var value : Nat };

  let reports : Map.Map<ReportTypes.ReportId, ReportTypes.Report>;
  let nextReportId : { var value : Nat };

  let warnings : Map.Map<WarningTypes.WarningId, WarningTypes.Warning>;
  let nextWarningId : { var value : Nat };

  include BeachesApi(accessControlState, beaches, nextBeachId);
  include ReportsApi(accessControlState, reports, nextReportId);
  include WarningsApi(accessControlState, warnings, nextWarningId);

  // ReportKind -> tag text, so the report entity stays on the auto-derive path.
  func reportKindText(k : ReportTypes.ReportKind) : Text =
    switch (k) {
      case (#roughWater) "roughWater";
      case (#calmWater) "calmWater";
      case (#strongCurrents) "strongCurrents";
      case (#waterClarity) "waterClarity";
      case (#jellyfish) "jellyfish";
      case (#unusualWaves) "unusualWaves";
      case (#otherHazard) "otherHazard";
    };

  // ReviewStatus -> tag text.
  func reviewStatusText(s : ReportTypes.ReviewStatus) : Text =
    switch (s) {
      case (#unverified) "unverified";
      case (#verified) "verified";
      case (#dismissed) "dismissed";
    };

  // WarningSeverity -> tag text.
  func warningSeverityText(s : WarningTypes.WarningSeverity) : Text =
    switch (s) {
      case (#info) "info";
      case (#advisory) "advisory";
      case (#warning) "warning";
      case (#danger) "danger";
    };

  include Expose({
    entities = [
      beaches.toEntity("beach", "Beach", "id")
        .sample({
          id = 0;
          nameEn = "";
          nameFa = "";
          latitude = 0.0;
          longitude = 0.0;
          descriptionEn = "";
          descriptionFa = "";
          active = true;
        })
        .public_()
        .build(),
      reports.toEntityManual("report", "Report", "id")
        .sample({
          id = 0;
          beachId = 0;
          kind = #roughWater;
          note = "";
          submittedAt = 0;
          status = #unverified;
          reviewedAt = ?0;
        })
        .payload("id", func r = r.id)
        .payload("beachId", func r = r.beachId)
        .edge("beachId", "beach")
        .payload("kind", func r = reportKindText(r.kind))
        .payload("note", func r = r.note)
        .payload("submittedAt", func r = r.submittedAt)
        .payload("status", func r = reviewStatusText(r.status))
        .payload("reviewedAt", func r = r.reviewedAt)
        .controllerOnly()
        .build(),
      warnings.toEntityManual("warning", "Warning", "id")
        .sample({
          id = 0;
          beachId = ?0;
          messageEn = "";
          messageFa = "";
          severity = #info;
          issuedAt = 0;
          published = true;
        })
        .payload("id", func w = w.id)
        .payload("beachId", func w = w.beachId)
        .edge("beachId", "beach")
        .payload("messageEn", func w = w.messageEn)
        .payload("messageFa", func w = w.messageFa)
        .payload("severity", func w = warningSeverityText(w.severity))
        .payload("issuedAt", func w = w.issuedAt)
        .payload("published", func w = w.published)
        .public_()
        .build(),
    ];
  });

  include ApiDocMixin();
};
