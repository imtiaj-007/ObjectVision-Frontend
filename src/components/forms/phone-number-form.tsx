import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { ChevronDown, Check } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Country, DemoPhoneNumber, PhoneNumber } from '@/types/general';
import { phoneNumberSchema } from '@/schemas/user-info';
import { useDebounce } from '@/hooks/use-debounce';


interface PhoneNumberFormProps {
    phoneValues: PhoneNumber | undefined;
    onPhoneNumberChange: (phoneData: PhoneNumber) => void;
    setIsValid: (isValid: boolean) => void;
    countries: Country[] | undefined;
    selectedCountry: Country | undefined;
    setCountry: React.Dispatch<React.SetStateAction<Country | undefined>>
}

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
    phoneValues, onPhoneNumberChange, setIsValid, countries, selectedCountry, setCountry
}) => {
    const [countrySelectOpen, setCountrySelectOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const form = useForm<PhoneNumber>({
        resolver: zodResolver(phoneNumberSchema),
        defaultValues: phoneValues || DemoPhoneNumber,
        mode: "onTouched"
    });

    const filteredCountries = countries?.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCountryCallingCode = (country: Country): string => {
        if (country.idd.suffixes?.length === 1) {
            return `${country.idd.root || ''}${country.idd.suffixes[0] || ''}`;
        }
        return country.idd.root || '';
    };

    const getCurrencyInfo = (currencies: Country['currencies']): string => {
        if (!currencies) return 'N/A';
        const currency = Object.values(currencies)[0];
        return `${currency.name} (${currency.symbol})`;
    };

    const getLanguages = (languages: Country['languages']): string => {
        if (!languages) return 'N/A';
        return Object.values(languages).join(', ');
    };

    const updateForm = (values: PhoneNumber) => {
        if (form.formState.isValid) {
            onPhoneNumberChange(values as PhoneNumber);
            setIsValid(true);
            form.reset(values, { keepValues: true });
        }
    };

    const debouncedUpdate = useDebounce((values: PhoneNumber) => {
        updateForm(values)
    }, 500);

    useEffect(() => {
        if (selectedCountry) {
            const countryCode = getCountryCallingCode(selectedCountry);
            form.setValue('country_code', countryCode);
        }
    }, [selectedCountry, form]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            if (form.formState.isDirty) {
                debouncedUpdate(value as PhoneNumber);
            }
        });
        return () => subscription.unsubscribe();
    }, [debouncedUpdate, form]);

    return (
        <>
            <Form {...form}>
                <form className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-end md:space-x-2 space-y-2 md:space-y-0">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-5 space-y-2">
                                    <FormLabel>Country</FormLabel>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-between border"
                                        onClick={() => setCountrySelectOpen(true)}
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
                                            <span className="text-muted-foreground">Select a country</span>
                                        )}
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <FormLabel>Code</FormLabel>
                                    <Input
                                        value={selectedCountry ? getCountryCallingCode(selectedCountry) : ''}
                                        disabled
                                    />
                                </div>

                                <div className="md:col-span-5">
                                    <FormField
                                        control={form.control}
                                        name="phone_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mobile Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="Enter your mobile number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedCountry && (
                        <Card className="bg-slate-50 dark:bg-zinc-900">
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="font-semibold">Country:</p>
                                        <p>{selectedCountry.name.common}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Currency:</p>
                                        <p>{selectedCountry.currencies && getCurrencyInfo(selectedCountry.currencies)}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Region:</p>
                                        <p>{selectedCountry.region} - {selectedCountry.subregion}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Languages:</p>
                                        <p>{selectedCountry.languages && getLanguages(selectedCountry.languages)}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Timezone:</p>
                                        <p>{selectedCountry.timezones[0]}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </form>
            </Form>

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
                            {filteredCountries?.map((country) => (
                                <CommandItem
                                    key={country.cca2}
                                    value={country.name.common}
                                    onSelect={() => {
                                        setCountry(country);
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
        </>
    );
};

export default PhoneNumberForm;