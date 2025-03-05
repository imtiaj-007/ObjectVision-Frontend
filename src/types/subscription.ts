import { PlanDataTypeEnum } from "./enums";


export interface PlanType {
    id: number;
    name: string;
    amount: number;
    description: string;
    popular: boolean;
    premium: boolean;
    created_at: string;
    updated_at: string;
    feature_groups: FeatureGroupType[];
}

export interface FeatureGroupType {
    id: number;
    subscription_plan_id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    features: FeatureType[];
}

export interface FeatureType {
    id: number;
    feature_group_id: number;
    key: string;
    data_type: PlanDataTypeEnum;
    required: boolean;
    value: string | boolean | number;
    created_at: string;
    updated_at: string;
}

export const DemoPlans = [
    {
        name: 'Basic Plan',
        amount: 0,
        description: 'Perfect for beginners and basic usage.',
        features: [
            {
                title: "Dashboard & Overview",
                validity: "15 days",
                storage: "250 MB",
                image_backup_duration: "1 month",
                video_backup_duration: "1 month",
            },
            {
                title: "AI Model Access",
                model_ov_n: true,
                model_ov_s: true,
                model_ov_m: false,
                model_ov_l: false,
                model_ov_x: false
            },
            {
                title: "Image Processing",
                daily_limit: 2,
                total_limit: 5,
                max_image_size: "5 MB",
                supported_formats: "All standard formats",
                validity: "15 days"
            },
            {
                title: "Video Processing",
                daily_limit: 1,
                total_limit: 2,
                max_video_size: "25 MB",
                supported_formats: "All standard formats",
                validity: "15 days"
            },
            {
                title: "Additional Features",                
                privacy_protection: true,
                dashboard_access: true,
                core_features_access: true
            }
        ],
        popular: false,
        premium: false
    },
    {
        name: 'Silver Plan',
        amount: 50,
        description: 'Ideal for regular users and moderate usage.',
        features: [
            {
                title: "Dashboard & Overview",
                validity: "30 days",
                storage: "500 MB",
                image_backup_duration: "2 months",
                video_backup_duration: "2 months",
            },
            {
                title: "AI Model Access",
                model_ov_n: true,
                model_ov_s: true,
                model_ov_m: true,
                model_ov_l: false,
                model_ov_x: false
            },
            {
                title: "Image Processing",
                daily_limit: 5,
                total_limit: 15,
                max_image_size: "5 MB",
                supported_formats: "All standard formats",
                validity: "30 days"
            },
            {
                title: "Video Processing",
                daily_limit: 2,
                total_limit: 5,
                max_video_size: "25 MB",
                supported_formats: "All standard formats",
                validity: "30 days"
            },
            {
                title: "Additional Features",                
                privacy_protection: true,
                dashboard_access: true,
                core_features_access: true
            }
        ],
        popular: true,
        premium: false
    },
    {
        name: 'Gold Plan',
        amount: 100,
        description: 'Best for power users and daily usage.',
        features: [
            {
                title: "Dashboard & Overview",
                validity: "60 days",
                storage: "1 GB"
            },
            {
                title: "AI Model Access",
                model_ov_n: true,
                model_ov_s: true,
                model_ov_m: true,
                model_ov_l: true,
                model_ov_x: false
            },
            {
                title: "Image Processing",
                daily_limit: 5,
                total_limit: 30,
                max_image_size: "5 MB",
                supported_formats: "All standard formats",
                validity: "60 days"
            },
            {
                title: "Video Processing",
                daily_limit: 2,
                total_limit: 10,
                max_video_size: "25 MB",
                supported_formats: "All standard formats",
                validity: "60 days"
            },
            {
                title: "Additional Features",
                image_backup_duration: "3 months",
                video_backup_duration: "3 months",
                privacy_protection: true,
                dashboard_access: true,
                core_features_access: true
            }
        ],
        popular: false,
        premium: true
    }
];
