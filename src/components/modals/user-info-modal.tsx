/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Command, CommandInput, CommandList,
    CommandGroup, CommandItem, CommandEmpty, CommandDialog
} from "@/components/ui/command";
import { Check, ChevronDown, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import useUser from '@/hooks/use-user';
import { useUserInfo } from '@/hooks/use-user-info';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Country, isCustomError } from '@/types/general';
import { addressSchema } from '@/schemas/user-info';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import LoadingScreen from '../ui/screen_loader';


interface UserInfoModalProps {
    open: boolean;
    onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ open, onClose }) => {
    const { user } = useUser();
    const {
        step, userName, phoneNumber, countries, selectedCountry,
        address, loading, error, countrySelectOpen, searchQuery,
        handleNext, handleBack, setUserName, setPhoneNumber,
        setSelectedCountry, setAddress, setCountrySelectOpen, setSearchQuery, setCountries,
        setError, resetUserInfo, submitForm, getUsernames
    } = useUserInfo();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const sortedCountries = data.sort((a: Country, b: Country) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sortedCountries);
                setSelectedCountry(sortedCountries.find((country: Country) => country.cca2 === 'IN'));

            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch countries');

            }
        };

        fetchCountries();
        getUsernames();
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCountryCallingCode = (country: Country): string => {
        if (country.idd.suffixes?.length === 1) {
            return `${country.idd.root}${country.idd.suffixes[0]}`;
        }
        return country.idd.root;
    };

    const getCurrencyInfo = (currencies: Country['currencies']): string => {
        const currency = Object.values(currencies)[0];
        return `${currency.name} (${currency.symbol})`;
    };

    const getLanguages = (languages: Country['languages']): string => {
        return Object.values(languages).join(', ');
    };

    const handleSubmit = async () => {
        try {
            addressSchema.parse(address);
            const payload = {
                username: userName,
                phone_number: phoneNumber,
                address: address,
            };            
            const res = await submitForm(payload);
            toast({
                variant: "success",
                title: "Profile Updated:",
                description: res.message || "Successfully updated user information.",
            });
            resetUserInfo();
            onClose();

        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setError(validationError.errors[0]?.message);
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "An unexpected error has occurred",
                });
            }
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div className='p-4 border border-gray-400 rounded-lg'>
                            <p className="text-sm text-muted-foreground mb-2">
                                Your username must follow these rules:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-500">
                                <li>Must be between <strong>4-10 characters</strong> long.</li>
                                <li>Can contain <strong>a-z, A-Z, 0-9, ! @ # $ _ -</strong> only.</li>
                                <li>No spaces or special characters other than the allowed ones.</li>
                            </ul>
                        </div>

                        <div>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Choose a username"
                                className="w-full"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row md:items-end md:space-x-2 space-y-2 md:space-y-0">
                                <div className="flex w-full md:w-auto space-x-2 mb-2 lg:mb-0">
                                    <div className="w-2/3 md:w-48">
                                        <Label>Country</Label>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-between"
                                            onClick={() => setCountrySelectOpen(true)}
                                            disabled={loading}
                                        >
                                            {selectedCountry ? (
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src={selectedCountry.flags.svg || selectedCountry.flags.png}
                                                        alt={selectedCountry.name.common}
                                                        width={24}
                                                        height={16}
                                                        className="object-cover"
                                                    />
                                                    <span className="truncate">{selectedCountry.name.common}</span>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    {loading ? 'Loading...' : 'Select a country'}
                                                </span>
                                            )}
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </Button>
                                    </div>

                                    <div className="w-1/3 md:w-24">
                                        <Label>Code</Label>
                                        <Input
                                            value={selectedCountry ? getCountryCallingCode(selectedCountry) : ''}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <Label>Mobile Number</Label>
                                    <Input
                                        type="tel"
                                        value={phoneNumber?.phone_number}
                                        onChange={(e) => setPhoneNumber({
                                            ...phoneNumber,
                                            phone_number: e.target.value
                                        })}
                                        placeholder="Enter your mobile number"
                                    />
                                </div>
                            </div>
                        </div>

                        {selectedCountry && (
                            <Card className="bg-slate-50 dark:bg-zinc-900">
                                <CardContent className="pt-6">
                                    {loading ? (
                                        <div className="text-center py-4">Loading country information...</div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="font-semibold">Country:</p>
                                                <p>{selectedCountry.name.common}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Currency:</p>
                                                <p>{getCurrencyInfo(selectedCountry.currencies)}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Region:</p>
                                                <p>{selectedCountry.region} - {selectedCountry.subregion}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Languages:</p>
                                                <p>{getLanguages(selectedCountry.languages)}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Timezone:</p>
                                                <p>{selectedCountry.timezones[0]}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Address Line 1</Label>
                            <Input
                                value={address?.address_line_1}
                                onChange={(e) => setAddress({ ...address, address_line_1: e.target.value })}
                                placeholder="House no, building Information"
                            />
                        </div>
                        <div>
                            <Label>Address Line 2</Label>
                            <Input
                                value={address?.address_line_2}
                                onChange={(e) => setAddress({ ...address, address_line_2: e.target.value })}
                                placeholder="Street information"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>City</Label>
                                <Input
                                    value={address?.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    placeholder="City"
                                />
                            </div>
                            <div>
                                <Label>State / Province</Label>
                                <Input
                                    value={address?.state_province}
                                    onChange={(e) => setAddress({ ...address, state_province: e.target.value })}
                                    placeholder="State or province"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Country</Label>
                                <div className="flex items-center border rounded-md px-2 bg-gray-100 dark:bg-neutral-900">
                                    {selectedCountry?.flags?.svg && (
                                        <Image
                                            src={selectedCountry.flags.svg || selectedCountry.flags.png}
                                            alt={selectedCountry.name.common}
                                            width={24}
                                            height={16}
                                            className="object-cover ms-1"
                                        />
                                    )}
                                    <Input
                                        value={selectedCountry?.name?.common}
                                        placeholder="Enter your country"
                                        disabled
                                        className="border-none bg-transparent focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Postal Code</Label>
                                <Input
                                    value={address?.postal_code}
                                    onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
                                    placeholder="Postal or zip code"
                                    pattern={selectedCountry?.postalCode?.regex.slice(1, -1)}
                                />
                            </div>
                        </div>
                    </div>
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
                        <p className="text-2xl mb-1">Hi {user?.name}</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm">
                            Before we proceed, please fill in these details.
                        </p>
                        <p className="text-base">
                            {step === 1
                                ? 'Choose a unique username'
                                : step === 2
                                    ? 'Enter Mobile Number'
                                    : 'Enter Address'}
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

                <CommandDialog open={countrySelectOpen} onOpenChange={setCountrySelectOpen}>
                    <Command>
                        <CommandInput
                            placeholder="Search country..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {filteredCountries.map((country) => (
                                    <CommandItem
                                        key={country.cca2}
                                        value={country.name.common}
                                        onSelect={() => {
                                            setSelectedCountry(country);
                                            setCountrySelectOpen(false);
                                        }}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <Image
                                            src={country.flags.png}
                                            alt={country.name.common}
                                            width={24}
                                            height={16}
                                            className="object-cover w-6 h-4"
                                        />
                                        <span>{country.name.common}</span>
                                        {selectedCountry?.cca2 === country.cca2 && (
                                            <Check className="ml-auto h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </CommandDialog>

                <div className="flex items-center justify-between mt-6">
                    <div className="w-24">
                        {step > 1 && (
                            <Button onClick={handleBack} variant="outline">
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        )}
                    </div>

                    <div className="w-24 flex items-center gap-2">
                        {[1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className={`h-1 w-6 rounded-full transition-all duration-300 
                                    ${index <= step ? 'bg-blue-600' : 'bg-gray-200'}`}
                            />
                        ))}
                    </div>

                    <div className="w-24 flex justify-end">
                        {step === 3 ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={!address?.address_line_1 || !address?.city || !address?.state_province || !address?.postal_code}
                            >
                                Submit
                            </Button>
                        ) : (
                            <Button onClick={handleNext}>
                                Next
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>

        {loading && <LoadingScreen />}
        </>
    );
};

export default UserInfoModal;