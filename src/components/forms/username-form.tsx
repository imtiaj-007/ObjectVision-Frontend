import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { usernameSchema } from '@/schemas/user-info';
import { InfoIcon } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';


interface UsernameFormProps {
    userName: string;
    setUserName: (value: string) => void;
    setIsValid: (isValid: boolean) => void;
    existingUsernames: string[];
}

const UsernameForm: React.FC<UsernameFormProps> = ({
    userName,
    setUserName,
    setIsValid,
    existingUsernames
}) => {
    const form = useForm<z.infer<typeof usernameSchema>>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: userName || ''
        }
    });

    const validateUsernameUnique = (value: string) => {
        return !existingUsernames.includes(value) || 'Username is already taken';
    };

    // Watch form values and validate
    const watchUsername = form.watch('username');

    useEffect(() => {
        if (watchUsername) {
            const isValid = form.formState.isValid && validateUsernameUnique(watchUsername) === true;
            setIsValid(isValid);
            setUserName(watchUsername);
        } else {
            setIsValid(false);
        }
    }, [watchUsername, form.formState.isValid, existingUsernames]);

    return (
        <Form {...form}>
            <form className="space-y-6">
                <Alert variant="outline" className="bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-black/30">
                    <InfoIcon className="h-4 w-4" />
                    <AlertDescription>
                        <p className="font-medium text-muted-foreground mt-1 mb-2">
                            Your username must follow these rules:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                            <li>Must be between <strong>4-10 characters</strong> long.</li>
                            <li>Can contain <strong>a-z, A-Z, 0-9, ! @ # $ _ -</strong> only.</li>
                            <li>No spaces or special characters other than the allowed ones.</li>
                            <li>Must be unique.</li>
                        </ul>
                    </AlertDescription>
                </Alert>

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Choose a username"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        form.trigger('username');
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                            {watchUsername && validateUsernameUnique(watchUsername) !== true && (
                                <p className="text-sm font-medium text-destructive mt-1">
                                    Username is already taken
                                </p>
                            )}
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default UsernameForm;