'use client'
import { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { Image as ImageIcon, UploadCloud, X, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import PlanPill from "@/components/ui/plan-pill";

import { DetectionRequestSchema } from "@/schemas/detection";
import { AVAILABLE_MODELS, DetectionOperation, ModelResponse, OPERATIONS } from "@/types/detection";
import { ActivityTypeEnum, ModelSizeEnum, SubscriptionPlansEnum } from "@/types/enums";
import { UserActivityResponse } from "@/types/subscription_activity";
import { toast } from "@/hooks/use-toast";
import { useDetection } from "@/hooks/use-detection";
import { useSubscriptionActivity } from "@/hooks/use-subscription-activity";
import { cn } from "@/lib/utils";
import { base64Hash } from "@/utils/hash";
import { File_Storage } from "../../../cache/file_storage";



const ImageProcessingComponent: React.FC = () => {
    const router = useRouter();
    const path = usePathname();
    const { activePlans, userActivity } = useSubscriptionActivity();
    const { storeImageFormData } = useDetection();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedModel, setSelectedModel] = useState<ModelResponse>();
    const [selectedOps, setSelectedOps] = useState<string[]>([]);
    const [confidence, setConfidence] = useState<number>(0.5);
    const [imageActivity, setImageActivity] = useState<UserActivityResponse | null>(null);


    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            toast({
                variant: "destructive",
                title: "Unsupported Image Format",
                description: "Please upload a Image of specified format."
            })
        }
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const MAX_FILE_SIZE = 3 * 1024 * 1024;
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast({
                variant: "destructive",
                title: "Unsupported Image Format",
                description: "Please upload a valid image file."
            });
            return;
        }
        else if (file.size > MAX_FILE_SIZE) {
            toast({
                variant: "destructive",
                title: "File Too Large",
                description: "Maximum allowed file size is 3MB."
            });
            return;
        }
        else {
            setImageFile(file);

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const toggleOperation = useCallback((opId: string) => {
        setSelectedOps(prev =>
            prev.includes(opId)
                ? prev.filter(id => id !== opId)
                : [...prev, opId]
        );
    }, []);

    const handleConfidenceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setConfidence(Number(e.target.value));
    }, []);

    const resetConfig = useCallback(() => {
        setImagePreview(null);
        setImageFile(null);
        setSelectedModel(
            AVAILABLE_MODELS.find(model => model.name === "ov_model_s") || AVAILABLE_MODELS[0]
        );
        setSelectedOps(OPERATIONS.map(op => op.name));
        setConfidence(0.5);
    }, []);

    const isModelAvailable = (model_name: string) => {
        switch ((activePlans && activePlans[0]?.plan_name) || SubscriptionPlansEnum.BASIC) {
            case SubscriptionPlansEnum.BASIC:
                return model_name === "ov_model_n" || model_name === "ov_model_s";
            // case SubscriptionPlansEnum.SILVER:
            //     return model_name === "ov_model_n" || model_name === "ov_model_s" || model_name === "ov_model_m";
            // case SubscriptionPlansEnum.GOLD:
            //     return model_name !== "ov_model_x";
            // default:
            //     return false;
            default:
                return model_name === "ov_model_n" || model_name === "ov_model_s" || model_name === "ov_model_m";
        }
    };

    const handleModelChange = (model_name: string) => {
        const model = AVAILABLE_MODELS.find(model => model.name == model_name) || AVAILABLE_MODELS[0];
        setSelectedModel(model);
    };

    const handleProcessImage = useCallback(() => {
        if (!selectedModel || !selectedOps || !imageFile) return;
        if (!imageActivity || imageActivity.total_usage >= imageActivity.total_limit) {
            toast({
                variant: "destructive",
                title: "Image Quota Full",
                description: "Please buy a subscription plan or recharge top-up to continue."
            });
            return;
        }

        const modelSizeKey = selectedModel.name as keyof typeof ModelSizeEnum;
        const modelSize = ModelSizeEnum[modelSizeKey];

        if (!modelSize) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Invalid model size selected.",
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("model_size", modelSize);
        formData.append("requested_services", JSON.stringify(selectedOps));

        const data = {
            file: formData.get('file') as File,
            model_size: modelSize,
            requested_services: JSON.parse(formData.get('requested_services') as string) as string[],
        };

        const result = DetectionRequestSchema.safeParse(data);

        if (!result.success) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: result.error.errors.map(err => err.message).join(", "),
            });
            return;
        };
        const file_id = new Date().getTime().toString();
        File_Storage.storeFile(file_id, imageFile);

        storeImageFormData({
            file_id,
            model_size: modelSize,
            requested_services: data.requested_services
        });
        const redirectPath = path.split('/').slice(0, -1).concat('predictions').join('/');
        router.push(`${redirectPath}/${base64Hash(imageFile.name)}/?socketConnection=true`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedModel, selectedOps, imageFile, imageActivity]);


    useEffect(() => {
        setSelectedModel(
            AVAILABLE_MODELS.find(model => model.name === "ov_model_s") || AVAILABLE_MODELS[0]
        );
        setSelectedOps(OPERATIONS.map(op => op.name));
    }, []);

    useEffect(() => {
        if (userActivity) {
            const img_activity = userActivity?.find(
                (activity) => activity.activity_type === ActivityTypeEnum.IMAGE_USAGE
            );
            setImageActivity(img_activity || null);
        }
    }, [userActivity]);


    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="header">
                <h2 className="flex items-start text-2xl font-bold">
                    <i className="inline-flex mr-2"><ImageIcon className="w-7 h-7" /></i>
                    Image Processing
                </h2>
            </div>

            {/* <Alert variant="destructive">
                <AlertDescription>
                    Some advanced models are temporarily unavailable due to high demand. But don&apos;t wory, Alternate models with similar precision remain fully accessible !
                </AlertDescription>
            </Alert> */}

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <div>
                                Upload Image
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-300 mt-2 md:flex items-center md:space-x-4">
                                    <p>Supported formats: JPG, JPEG, PNG, WEBP.</p>
                                    <p>Max size: 3 MB.</p>
                                </div>
                            </div>
                            {imagePreview &&
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="hover:bg-red-500 hover:text-white"
                                    onClick={() => setImagePreview(null)}
                                >
                                    <X className="size-5" />
                                </Button>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!imagePreview ? (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={cn(
                                    "border-2 border-dashed rounded-lg p-8 text-center",
                                    "transition-colors duration-200",
                                    isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25"
                                )}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <UploadCloud className="h-12 w-12 text-muted-foreground/50" />
                                    <p className="text-lg font-medium">Drag & Drop Image</p>
                                    <p className="text-sm text-muted-foreground">or</p>
                                    <Button variant="ghost" onClick={() => document.getElementById('file-input')?.click()}>
                                        Choose File
                                    </Button>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileInput}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <Image
                                    src={imagePreview}
                                    alt="Uploaded Image"
                                    width={0}
                                    height={0}
                                    className="w-full max-w-96 h-full max-h-80 object-cover object-center rounded-lg shadow-md border"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>


                {/* Configuration Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Processing Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Model Selection and Confidence Threshold */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Model Selection</label>
                                <Select value={selectedModel?.name} onValueChange={handleModelChange}>
                                    <SelectTrigger>
                                        <div className="flex items-center space-x-3">
                                            <span>{selectedModel ? <selectedModel.icon className="w-4 h-4" /> : null}</span>
                                            <span>{selectedModel ? selectedModel.label : "Select a model"}</span>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AVAILABLE_MODELS.map(model => (
                                            <SelectItem
                                                key={model.name}
                                                value={model.name}
                                                disabled={!isModelAvailable(model.name)}
                                            >
                                                <div className="flex items-center space-x-3 w-full">
                                                    <div className="hidden md:flex md:items-center md:justify-center w-4 h-4">
                                                        {<model.icon className="w-4 h-4" />}
                                                    </div>
                                                    <div className="flex flex-1 items-start w-full">
                                                        <div className="grid grid-cols-12 gap-2 w-[250px] md:w-[320px]">
                                                            <div className="col-span-10 space-y-1">
                                                                <p className="font-medium">{model.label}</p>
                                                                <p className="text-xs text-muted-foreground">{model.description}</p>
                                                            </div>
                                                            <div className="col-span-2 flex items-center justify-center">
                                                                {model.name === "ov_model_m" && !isModelAvailable(model.name) && (
                                                                    <PlanPill plan={SubscriptionPlansEnum.SILVER} />
                                                                )}
                                                                {model.name === "ov_model_l" && !isModelAvailable(model.name) && (
                                                                    <PlanPill plan={SubscriptionPlansEnum.GOLD} />
                                                                )}
                                                                {model.name === "ov_model_x" && (
                                                                    <span className="text-xs text-center text-yellow-500">Coming Soon</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Confidence Threshold: {confidence}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={confidence}
                                    onChange={handleConfidenceChange}
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Adjust the minimum confidence score for detection results
                                </p>
                            </div>
                        </div>

                        {/* Operations Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Operations</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {OPERATIONS.map((op: DetectionOperation) => (
                                    <div key={`operation_${op.name}`} className="flex items-start space-x-3">
                                        <Checkbox
                                            id={op.name}
                                            checked={selectedOps.includes(op.name)}
                                            onCheckedChange={() => toggleOperation(op.name)}
                                            className="mt-[6px]"
                                        />
                                        <div>
                                            <label
                                                htmlFor={op.name}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {op.label}
                                            </label>
                                            <p className="text-xs text-muted-foreground">
                                                {op.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <Button
                    variant="outline"
                    onClick={resetConfig}
                >
                    Reset All
                </Button>
                <Button
                    type="submit"
                    onClick={handleProcessImage}
                    disabled={
                        !imageFile ||
                        !selectedModel ||
                        !selectedOps ||
                        selectedOps.length === 0
                    }
                >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Continue to Processing
                </Button>
            </div>
        </div>
    );
};

export default ImageProcessingComponent;