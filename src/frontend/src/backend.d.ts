import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Beach {
    id: BeachId;
    latitude: number;
    active: boolean;
    nameEn: string;
    nameFa: string;
    descriptionEn: string;
    descriptionFa: string;
    longitude: number;
}
export type BeachId = bigint;
export interface Cell {
    value: Value;
    name: string;
}
export type Error_ = {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
};
export type Error__1 = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Report {
    id: ReportId;
    status: ReviewStatus;
    kind: ReportKind;
    note: string;
    submittedAt: Timestamp;
    beachId: BeachId;
    reviewedAt?: Timestamp;
}
export type ReportId = bigint;
export type Result = {
    __kind__: "ok";
    ok: Beach;
} | {
    __kind__: "err";
    err: Error_;
};
export type Result_1 = {
    __kind__: "ok";
    ok: Report;
} | {
    __kind__: "err";
    err: Error_;
};
export type Result_2 = {
    __kind__: "ok";
    ok: Warning;
} | {
    __kind__: "err";
    err: Error_;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Array<Warning>;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Result__1 {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__2 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error__1;
};
export type Timestamp = bigint;
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface Warning {
    id: WarningId;
    messageEn: string;
    messageFa: string;
    published: boolean;
    beachId?: BeachId;
    severity: WarningSeverity;
    issuedAt: Timestamp;
}
export type WarningId = bigint;
export enum ReportKind {
    strongCurrents = "strongCurrents",
    waterClarity = "waterClarity",
    unusualWaves = "unusualWaves",
    jellyfish = "jellyfish",
    calmWater = "calmWater",
    otherHazard = "otherHazard",
    roughWater = "roughWater"
}
export enum ReviewStatus {
    verified = "verified",
    unverified = "unverified",
    dismissed = "dismissed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum WarningSeverity {
    warning = "warning",
    danger = "danger",
    info = "info",
    advisory = "advisory"
}
export interface backendInterface {
    addBeach(nameEn: string, nameFa: string, latitude: number, longitude: number, descriptionEn: string, descriptionFa: string): Promise<Result>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createWarning(beachId: bigint | null, messageEn: string, messageFa: string, severity: WarningSeverity, published: boolean): Promise<Result_2>;
    ensureBeachesSeeded(): Promise<void>;
    execute(qJson: string): Promise<Result__1>;
    getApiDoc(): Promise<string>;
    getBeach(id: BeachId): Promise<Beach | null>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    listAllWarnings(): Promise<Result_3>;
    listBeaches(): Promise<Array<Beach>>;
    listPublishedWarnings(): Promise<Array<Warning>>;
    listReports(): Promise<Array<Report>>;
    listReportsForBeach(beachId: bigint): Promise<Array<Report>>;
    reviewReport(id: ReportId, status: ReviewStatus): Promise<Result_1>;
    schema(): Promise<string>;
    setWarningPublished(id: WarningId, published: boolean): Promise<Result_2>;
    submitReport(beachId: bigint, kind: ReportKind, note: string): Promise<Result_1>;
    updateBeach(id: BeachId, nameEn: string, nameFa: string, latitude: number, longitude: number, descriptionEn: string, descriptionFa: string, active: boolean): Promise<Result>;
}
