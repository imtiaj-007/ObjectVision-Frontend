import { cn } from "@/lib/utils";
import { SubscriptionPlansEnum } from "@/types/enums";

interface PlanPillProps {
    plan: SubscriptionPlansEnum;
    className?: string;
}

const PlanPill: React.FC<PlanPillProps> = ({ plan, className }) => {
    // Styles for each plan
    const planStyles = {
        BASIC: "bg-green-200 text-gray-900",
        SILVER: "bg-blue-100 text-blue-800",
        GOLD: "bg-yellow-100 text-yellow-800",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                planStyles[plan],
                className
            )}
        >
            {plan.charAt(0) + plan.substring(1).toLowerCase()}
        </span>
    );
};

export default PlanPill;