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
        <div className={cn(
            "flex items-center justify-center",
            className
        )}>
            <span
                className={cn(
                    "py-1 px-3 rounded-full text-xs font-medium whitespace-nowrap",
                    planStyles[plan]
                )}
            >
                {plan.charAt(0) + plan.substring(1).toLowerCase()}
            </span>
        </div>
    );
};

export default PlanPill;