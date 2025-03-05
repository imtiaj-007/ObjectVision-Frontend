export enum UserRoleEnum {
    ADMIN = "ADMIN",
    SUB_ADMIN = "SUB_ADMIN",
    USER = "USER",
}

export enum ContactTypeEnum {
    HOME = "HOME",
    WORK = "WORK",
    OTHER = "OTHER",
}

export enum PlanDataTypeEnum {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN"
}

export enum CurrencyEnum {
    INR = "INR",
    USD = "USD",
    EUR = "EUR"
}

export enum SubscriptionPlansEnum {
    BASIC = "BASIC",
    SILVER = "SILVER",
    GOLD = "GOLD"
}

export enum PaymentStatus {
    CREATED = "created",
    AUTHORIZED = "authorized",
    CAPTURED = "captured",
    REFUNDED = "refunded",
    FAILED = "failed"
}

export enum ActivityTypeEnum {
    STORAGE_USAGE = "STORAGE_USAGE",
    IMAGE_USAGE = "IMAGE_USAGE",
    VIDEO_USAGE = "VIDEO_USAGE"
}
