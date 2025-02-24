import { cn } from "@/lib/utils";

interface PlanPillProps {
    plan: "FREE" | "SILVER" | "GOLD";
    className?: string;
}

const PlanPill: React.FC<PlanPillProps> = ({ plan, className }) => {
    // Styles for each plan
    const planStyles = {
        FREE: "bg-gray-100 text-gray-800",
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
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
        </span>
    );
};

export default PlanPill;