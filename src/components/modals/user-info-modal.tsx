import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UsernameForm from '../forms/username-form';
import AddressForm from '../forms/address-form';
import PhoneNumberForm from '../forms/phone-number-form';
import { Address, Country, isCustomError, PhoneNumber } from '@/types/general';
import { UserInfoData } from '@/types/user';
import useUser from '@/hooks/use-user';
import { useUserInfo } from '@/hooks/use-user-info';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { userService } from '@/services/user_services';
import Loader from '../ui/loader';


interface UserInfoModalProps {
    open: boolean;
    onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ open, onClose }) => {
    const { user_details } = useUser();
    const { userNames, getUsernames, submitForm } = useUserInfo();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

    const [userName, setUserName] = useState('');
    const [address, setAddress] = useState<Address | undefined>();
    const [phoneNumber, setPhoneNumber] = useState<PhoneNumber | undefined>();

    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(false);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

    useEffect(() => {
        async function getCountries() {
            try{
                const data = await userService.getCountryList();
                const sortedCountries = data.sort(
                    (a: Country, b: Country) =>
                        a.name.common.localeCompare(b.name.common)
                );
                const india = sortedCountries.find((country: Country) => country.cca2 === 'IN');

                setCountries(sortedCountries);
                setSelectedCountry(india);
            }
            catch(error) {
                setError(error instanceof(Error) ? error.message : 'Failed to fetch Country List');
            }
        }
        getCountries();
        getUsernames();        
    }, []);

    const handleNext = () => {
        if (step === 1 && !isUsernameValid) {
            setError("Provide a valid userName");
            return;
        }
        setStep(prev => prev + 1);
        setError(null);
    };

    const handleBack = () => {
        if (step <= 1) return;
        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            let payload: UserInfoData = { username: userName };
            if (phoneNumber) payload = { ...payload, phone_number: phoneNumber as PhoneNumber };
            if (address && isAddressValid) payload = { ...payload, address: address as Address };

            const data = await submitForm(payload as UserInfoData);
            toast({
                variant: "success",
                title: "Profile Updated:",
                description: data.message || "Successfully updated user information.",
            });
            onClose();

        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (error instanceof Error || isCustomError(error))
                    ? error.message
                    : "An unexpected error has occurred",
            });
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <UsernameForm
                        userName={userName}
                        setUserName={setUserName}
                        setIsValid={setIsUsernameValid}
                        existingUsernames={userNames}
                    />
                );
            case 2:
                return (
                    <AddressForm
                        addressValues={address}
                        onAddressChange={setAddress}
                        setIsValid={setIsAddressValid}
                        countries={countries}
                        selectedCountry={selectedCountry}
                        setCountry={setSelectedCountry}
                    />
                );
            case 3:
                return (
                    <PhoneNumberForm
                        phoneValues={phoneNumber}
                        onPhoneNumberChange={setPhoneNumber}
                        setIsValid={setIsPhoneNumberValid}
                        countries={countries}
                        selectedCountry={selectedCountry}
                        setCountry={setSelectedCountry}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Dialog open={open}>
                <DialogContent className="max-w-2xl" showClose={false}>
                    <DialogHeader className="relative">
                        <div className="absolute right-0 top-0">
                            <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                                Step {step}
                            </span>
                        </div>
                        <DialogTitle>
                            <p className="text-2xl mb-1">Hi {user_details?.user?.name}</p>
                            <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm">
                                Before we proceed, please fill in these details.
                            </p>
                            <p className="text-base">
                                {step === 1
                                    ? 'Choose a unique username'
                                    : step === 2
                                        ? 'Enter Address Details (Optional)'
                                        : 'Enter Mobile Number'}
                            </p>
                        </DialogTitle>
                    </DialogHeader>

                    {error && (
                        <Alert variant="destructive" className="flex items-center mb-4 dark:border-red-600">
                            <AlertCircle className="h-4 w-4 dark:text-red-600" />
                            <AlertDescription className="ml-2 dark:text-red-600">
                                {isCustomError(error) ? error.message : error}
                            </AlertDescription>
                        </Alert>
                    )}

                    {renderStepContent()}

                    <div className="flex items-center justify-between mt-6">
                        <div className="w-24">
                            {step > 1 && (
                                <Button onClick={handleBack} variant="outline" className="border-gray-600">
                                    <ChevronLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            )}
                        </div>

                        <div className="w-24 flex items-center gap-2">
                            {[1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'h-1 w-6 rounded-full transition-all duration-300',
                                        index <= step ? 'bg-blue-600' : 'bg-gray-200'
                                    )}
                                />
                            ))}
                        </div>

                        <div className="w-24 flex justify-end">
                            {step === 3 ? (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!isPhoneNumberValid}
                                >
                                    Submit
                                </Button>
                            ) : (
                                <Button onClick={handleNext}>
                                    {(step === 2 && !address) ? 'Skip' : 'Next'}
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {loading && <Loader className="w-full h-full" />}
        </>
    );
};

export default UserInfoModal;