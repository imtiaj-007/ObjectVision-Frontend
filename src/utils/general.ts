import { format, differenceInDays, parseISO, isBefore } from "date-fns";

export const formatDate = (date_str: string | null | undefined): string => {
    if (!date_str) return "...";
    return format(new Date(date_str), "dd/MM/yyyy");
};

export const remainingDays = (date_str: string | null | undefined): string => {
    if (!date_str) return "Invalid date";

    const daysLeft = differenceInDays(new Date(date_str), new Date()) + 1;

    if(daysLeft <= 0) return "Expired";
    if (daysLeft === 1) return "Today";
    if (daysLeft === 2) return "Tomorrow";
    
    return `${daysLeft} Days`;
};


export const checkExpired = (date_str: string | null | undefined): boolean => {
    if (!date_str) return true;
    
    const expiryDate = parseISO(date_str);
    return isBefore(expiryDate, new Date());
}

export const formatCurrency = (amount: number, currency: string = "INR") => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 2
    }).format(amount);
};
