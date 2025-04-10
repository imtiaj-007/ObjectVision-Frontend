import { ModelSizeEnum } from "@/types/enums";
import { z } from "zod";

export const ModelSizeEnumSchema = z.nativeEnum(ModelSizeEnum, {
    message: "Invalid model size",
});

export const DetectionRequestSchema = z.object({
    file: z.instanceof(File, { message: "File is required and must be a valid File object" }),
    model_size: ModelSizeEnumSchema,
    requested_services: z.array(z.string(), { message: "Requested services must be an array of strings" }),
});