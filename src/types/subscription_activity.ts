import { SubscriptionPlansEnum, ActivityTypeEnum } from "@/types/enums";

// ---------------- ActiveUserPlans Interfaces ----------------
export interface ActiveUserPlanBase {
    user_id: number;
    plan_id: number;
    plan_name: SubscriptionPlansEnum;
    description?: string | null;
    is_active: boolean;
    expiry_date?: string | null;
    backup_till?: string | null;
}

export type ActiveUserPlanCreate = ActiveUserPlanBase

export interface ActiveUserPlanUpdate {
    plan_id?: number;
    plan_name?: SubscriptionPlansEnum;
    description?: string | null;
    is_active?: boolean;
    expiry_date?: string | null;
    backup_till?: string | null;
}

export interface ActiveUserPlanResponse extends ActiveUserPlanBase {
    id: number;
    created_at: string;
    updated_at: string;
}

// ---------------- UserActivity Interfaces ----------------
export interface UserActivityBase {
    active_user_plan_id: number;
    activity_type: ActivityTypeEnum;
    daily_usage?: number;
    total_usage: number;
    daily_limit?: number | null;
    total_limit: number;
    max_size?: number | null;
}

export type UserActivityCreate = UserActivityBase

export interface UserActivityUpdate {
    activity_type?: ActivityTypeEnum;
    daily_usage?: number;
    total_usage?: number;
    daily_limit?: number | null;
    total_limit?: number | null;
    max_size?: number | null;
}

export interface UserActivityResponse extends UserActivityBase {
    id: number;
    created_at: string;
    updated_at: string;
}
