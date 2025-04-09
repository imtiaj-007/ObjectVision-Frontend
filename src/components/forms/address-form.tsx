import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Address, Country, DemoAddress } from '@/types/general';
import { addressSchema } from '@/schemas/user-info';
import { useDebounce } from '@/hooks/use-debounce';


interface AddressFormProps {
    addressValues: Address | undefined;
    onAddressChange: (address: Address | undefined) => void;
    setIsValid: (isValid: boolean) => void;
    countries: Country[] | undefined;
    selectedCountry: Country | undefined;
    setCountry: React.Dispatch<React.SetStateAction<Country | undefined>>
}

const AddressForm: React.FC<AddressFormProps> = ({ addressValues, onAddressChange, setIsValid, countries, selectedCountry, setCountry }) => {
    const [countrySelectOpen, setCountrySelectOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const form = useForm<Address>({
        resolver: zodResolver(addressSchema),
        defaultValues: addressValues || DemoAddress,
        mode: "onTouched"
    });

    const filteredCountries = countries?.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const updateForm = (values: Address) => {
        if (form.formState.isValid) {
            onAddressChange(values as Address);
            setIsValid(true);
            form.reset(values, { keepValues: true });
        }
    };

    const debouncedUpdate = useDebounce((values: Address) => {
        updateForm(values)
    }, 500);

    useEffect(() => {
        const subscription = form.watch((value) => {
            if (form.formState.isDirty) {
                debouncedUpdate(value as Address);
            }
        });
        return () => subscription.unsubscribe();
    }, [debouncedUpdate, form]);

    useEffect(() => {
        if (selectedCountry) {
            form.setValue('country', selectedCountry.name.common);
            form.setValue('country_code', selectedCountry.cca2);
        }
    }, [selectedCountry, form]);

    return (
        <>
            <Form {...form}>
                <form className="space-y-4">
                    <FormField
                        control={form.control}
                        name="address_line_1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input placeholder="House no, building Information" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address_line_2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Line 2</FormLabel>
                                <FormControl>
                                    <Input placeholder="Street information" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="state_province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State / Province</FormLabel>
                                    <FormControl>
                                        <Input placeholder="State or province" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormItem>
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
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="postal_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Postal or zip code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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

export default AddressForm;