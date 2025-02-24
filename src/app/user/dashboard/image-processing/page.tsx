'use client'
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Image as ImageIcon, UploadCloud, X, ArrowRight, Zap, Feather, Sparkles, BicepsFlexed, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PlanPill from "@/components/ui/plan-pill";

const AVAILABLE_MODELS = [
    {
        id: "ov-model-n",
        name: "Model oV-N",
        icon: <Zap className="h-4 w-4" />,
        description: "Fastest inference, suitable for basic tasks"
    },
    {
        id: "ov-model-s",
        name: "Model oV-S",
        icon: <Feather className="h-4 w-4" />,
        description: "Balanced performance for simple scenarios"
    },
    {
        id: "ov-model-m",
        name: "Model oV-M",
        icon: <Sparkles className="h-4 w-4" />,
        description: "Recommended for most use cases"
    },
    {
        id: "ov-model-l",
        name: "Model oV-L",
        icon: <BicepsFlexed className="h-4 w-4" />,
        description: "High accuracy, complex scene analysis"
    },
    {
        id: "ov-model-x",
        name: "Model oV-X",
        icon: <Rocket className="h-4 w-4" />,
        description: "Maximum precision, resource intensive"
    }
];

const OPERATIONS = [
    { id: "detection", label: "Object Detection", description: "Locate and identify objects in the image" },
    { id: "segmentation", label: "Segmentation", description: "Pixel-level object separation" },
    { id: "classification", label: "Classification", description: "Categorize main objects in the scene" },
    { id: "pose", label: "Pose Estimation", description: "Detect human body keypoints" }
];

const SUBSCRIPTION_PLANS = ["BASIC", "SILVER", "GOLD"] as const;
type SubscriptionPlan = typeof SUBSCRIPTION_PLANS[number];

export default function ImageProcessing() {
    const [image, setImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedModel, setSelectedModel] = useState<string>("ov-model-n");
    const [selectedOps, setSelectedOps] = useState<string[]>(["detection", "segmentation", "classification", "pose"]);
    const [confidence, setConfidence] = useState<number>(0.5);
    const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>("BASIC");

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
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
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
        setImage(null);
        setSelectedModel("ov-model-n");
        setSelectedOps(["detection"]);
        setConfidence(0.5);
    }, []);

    const isModelAvailable = (modelId: string) => {
        switch (subscriptionPlan) {
            case "BASIC":
                return modelId === "ov-model-n" || modelId === "ov-model-s";
            case "SILVER":
                return modelId === "ov-model-n" || modelId === "ov-model-s" || modelId === "ov-model-m";
            case "GOLD":
                return modelId !== "ov-model-x";
            default:
                return false;
        }
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="header">
                <h2 className="flex items-start text-2xl font-bold">
                    <i className="inline-flex mr-2"><ImageIcon className="w-7 h-7" /></i>
                    Image Processing
                </h2>
                <p className="text-gray-600 my-3">
                    Effortlessly analyze images using advanced AI-powered models. Adjust the confidence threshold to
                    refine accuracy and obtain precise insights.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!image ? (
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
                                    <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
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
                            <div className="relative flex justify-center">
                                <Image
                                    src={image}
                                    alt="Uploaded Image"
                                    width={0} 
                                    height={0}
                                    className="w-96 h-auto max-h-80 object-cover object-center rounded-lg shadow-md border"
                                />
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="absolute top-0 right-2"
                                    onClick={() => setImage(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
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
                                <Select value={selectedModel} onValueChange={setSelectedModel}>
                                    <SelectTrigger>
                                        <div className="flex items-center space-x-3">
                                            <span>{selectedModel ? AVAILABLE_MODELS.find(model => model.id === selectedModel)?.icon : null}</span>
                                            <span>{selectedModel ? AVAILABLE_MODELS.find(model => model.id === selectedModel)?.name : "Select a model"}</span>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AVAILABLE_MODELS.map(model => (
                                            <SelectItem
                                                key={model.id}
                                                value={model.id}
                                                disabled={!isModelAvailable(model.id)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="hidden md:block w-4 h-4">{model.icon}</div>
                                                    <div className="flex flex-col items-start">
                                                        <div className="font-medium">{model.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {model.description}
                                                            {model.id === "ov-model-m" && subscriptionPlan === "BASIC" && (
                                                                <PlanPill plan={"SILVER"} className="ml-8" />
                                                            )}
                                                            {model.id === "ov-model-l" &&
                                                                ["BASIC", "SILVER"].some(ele => ele === subscriptionPlan) && (
                                                                    <PlanPill plan={"GOLD"} className="ml-2" />
                                                                )}
                                                            {model.id === "ov-model-x" && (
                                                                <span className="text-xs text-yellow-600 ml-1">(Coming Soon)</span>
                                                            )}
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
                            <div className="grid grid-cols-2 gap-4">
                                {OPERATIONS.map(op => (
                                    <div key={op.id} className="flex items-start space-x-3">
                                        <Checkbox
                                            id={op.id}
                                            checked={selectedOps.includes(op.id)}
                                            onCheckedChange={() => toggleOperation(op.id)}
                                            className="mt-[6px]"
                                        />
                                        <div>
                                            <label
                                                htmlFor={op.id}
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
                    disabled={!image || selectedOps.length === 0}
                >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Continue to Processing
                </Button>
            </div>
        </div>
    );
}