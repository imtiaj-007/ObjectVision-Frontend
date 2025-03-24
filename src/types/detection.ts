import { LucideIcon } from "lucide-react";
import { Zap, Feather, Sparkles, BicepsFlexed, Rocket } from "lucide-react";
import { ModelSizeEnum } from "./enums";

export interface ModelResponse {
  id: number;
  name: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface DetectionOperation {
  id: number;
  name: string;
  label: string;
  description: string;
}

export interface FormInformation {
    file_id: string | null;
    model_size: ModelSizeEnum;
    requested_services: string[];
}

export interface DetectionRequest {
    file: File;
    model_size: ModelSizeEnum;
    requested_services: string[];
}

export const AVAILABLE_MODELS: ModelResponse[] = [
  {
    id: 1,
    name: "ov_model_n",
    label: "Model oV-N",
    icon: Zap,
    description: "Fastest inference, suitable for basic tasks",
  },
  {
    id: 2,
    name: "ov_model_s",
    label: "Model oV-S",
    icon: Feather,
    description: "Balanced performance for simple scenarios",
  },
  {
    id: 3,
    name: "ov_model_m",
    label: "Model oV-M",
    icon: Sparkles,
    description: "Recommended for most use cases",
  },
  {
    id: 4,
    name: "ov_model_l",
    label: "Model oV-L",
    icon: BicepsFlexed,
    description: "High accuracy, complex scene analysis",
  },
  {
    id: 5,
    name: "ov_model_x",
    label: "Model oV-X",
    icon: Rocket,
    description: "Maximum precision, resource intensive",
  },
];

export const OPERATIONS: DetectionOperation[] = [
  {
    id: 1,
    name: "detection",
    label: "Object Detection",
    description: "Locate and identify objects in the image",
  },
  {
    id: 2,
    name: "segmentation",
    label: "Segmentation",
    description: "Pixel-level object separation",
  },
  {
    id: 3,
    name: "classification",
    label: "Classification",
    description: "Categorize main objects in the scene",
  },
  {
    id: 4,
    name: "pose",
    label: "Pose Estimation",
    description: "Detect human body keypoints",
  },
];
