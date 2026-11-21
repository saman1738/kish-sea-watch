import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  type BeachId = Nat;
  type Beach = {
    id : BeachId;
    nameEn : Text;
    nameFa : Text;
    latitude : Float;
    longitude : Float;
    descriptionEn : Text;
    descriptionFa : Text;
    active : Bool;
  };

  type ReportId = Nat;
  type ReportKind = {
    #roughWater;
    #calmWater;
    #strongCurrents;
    #waterClarity;
    #jellyfish;
    #unusualWaves;
    #otherHazard;
  };
  type ReviewStatus = {
    #unverified;
    #verified;
    #dismissed;
  };
  type Report = {
    id : ReportId;
    beachId : BeachId;
    kind : ReportKind;
    note : Text;
    submittedAt : Int;
    status : ReviewStatus;
    reviewedAt : ?Int;
  };

  type WarningId = Nat;
  type WarningSeverity = {
    #info;
    #advisory;
    #warning;
    #danger;
  };
  type Warning = {
    id : WarningId;
    beachId : ?BeachId;
    messageEn : Text;
    messageFa : Text;
    severity : WarningSeverity;
    issuedAt : Int;
    published : Bool;
  };

  public type OldActor = {};

  public type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    beaches : Map.Map<BeachId, Beach>;
    nextBeachId : { var value : Nat };
    reports : Map.Map<ReportId, Report>;
    nextReportId : { var value : Nat };
    warnings : Map.Map<WarningId, Warning>;
    nextWarningId : { var value : Nat };
  };

  func seedBeaches() : Map.Map<BeachId, Beach> {
    let beaches = Map.empty<BeachId, Beach>();
    let seeds : [Beach] = [
      {
        id = 0;
        nameEn = "Marjan Beach";
        nameFa = "ساحل مرجان";
        latitude = 26.5233;
        longitude = 53.9800;
        descriptionEn = "A calm sandy beach on the north coast of Kish Island, popular for swimming and family outings.";
        descriptionFa = "ساحلی شنی و آرام در سواحل شمالی جزیره کیش، مناسب شنا و گردش خانوادگی.";
        active = true;
      },
      {
        id = 1;
        nameEn = "Simorgh Beach";
        nameFa = "ساحل سیمرغ";
        latitude = 26.5333;
        longitude = 54.0200;
        descriptionEn = "A wide beach on the eastern shore of Kish Island with open views of the Persian Gulf.";
        descriptionFa = "ساحلی پهناور در کرانه شرقی جزیره کیش با دید باز به خلیج فارس.";
        active = true;
      },
      {
        id = 2;
        nameEn = "Mir Mahna Coastal Park";
        nameFa = "پارک ساحلی میرمهنا";
        latitude = 26.5500;
        longitude = 53.9700;
        descriptionEn = "A coastal park on the north-west of Kish Island with shaded walkways near the water.";
        descriptionFa = "پارک ساحلی در شمال غربی جزیره کیش با مسیرهای سایه‌دار نزدیک آب.";
        active = true;
      },
      {
        id = 3;
        nameEn = "Fisherman Beach Park";
        nameFa = "پارک ساحلی ماهیگیران";
        latitude = 26.5400;
        longitude = 53.9500;
        descriptionEn = "A working fishing shoreline on the west of Kish Island, often breezy with choppier water.";
        descriptionFa = "ساحل ماهیگیری در غرب جزیره کیش، اغلب بادگیر با آب مواج‌تر.";
        active = true;
      },
    ];
    for (beach in seeds.values()) {
      beaches.add(beach.id, beach);
    };
    beaches;
  };

  public func migration(_ : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      beaches = seedBeaches();
      nextBeachId = { var value = 4 };
      reports = Map.empty();
      nextReportId = { var value = 0 };
      warnings = Map.empty();
      nextWarningId = { var value = 0 };
    };
  };
};
