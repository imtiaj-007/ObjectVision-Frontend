/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send, Phone, Clock, MapPin } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { settings } from '@/configuration/config';


// Form validation schema
const formSchema = z.object({
    user_name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    user_phone: z.string().optional(),
    mail_subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
    user_message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
    cur_time: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactUsPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user_name: '',
            email: '',
            user_phone: '',
            mail_subject: '',
            user_message: '',
            cur_time: new Date().toLocaleString()
        },
        mode: "onSubmit"
    });

    const onSubmit = async (data: FormValues) => {
        if (!formRef.current) return;
        setIsSubmitting(true);

        try {
            emailjs
                .sendForm(
                    settings.EMAIL_SERVICE_ID,
                    settings.EMAIL_TEMPLATE_ID,
                    formRef.current,
                    { publicKey: settings.EMAIL_PUBLIC_KEY, }
                )
                .then(() => { console.log('SUCCESS!') },
                    (error) => {
                        throw new Error(error.text);
                    },
                );

            toast({
                variant: "success",
                title: "Message sent!",
                description: "We'll get back to you as soon as possible.",
            });

            setFormSubmitted(true);
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Your message couldn't be sent. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerDuration = 0.4;

    return (
        <div className="min-h-screen bg-slate-900">
            <motion.div
                className="container mx-auto py-16 px-4 sm:px-6 lg:px-8"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-16">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-200"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="block">Get in Touch</span>
                        <span className="block text-primary mt-2">We&apos;d love to hear from you</span>
                    </motion.h1>
                    <motion.p
                        className="mt-6 max-w-2xl mx-auto text-xl text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Have questions about ObjectVision? Need help with our AI image detection platform?
                        Our team is here to assist you.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <motion.div
                        className="lg:col-span-2 flex flex-col h-full"
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: staggerDuration }}
                        style={{ height: "100%" }}
                    >
                        <div className="flex flex-col h-full space-y-6">
                            <motion.div variants={itemVariants} className="flex-1">
                                <Card className="bg-slate-800 border-slate-800 p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-white">Email Us</h3>
                                            <p className="mt-1 text-gray-300">
                                                imtiaj.dev.kol@gmail.com<br />
                                                support@objectvision.ai
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex-1">
                                <Card className="bg-slate-800 border-slate-800 p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-white">Our Location</h3>
                                            <p className="mt-1 text-gray-300">
                                                Kolkata, West Bengal<br />
                                                India
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex-1">
                                <Card className="bg-slate-800 border-slate-800 p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-white">Business Hours</h3>
                                            <p className="mt-1 text-gray-300">
                                                Week days: 10AM - 6PM <br />
                                                Week ends: 10AM - 4PM
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-3 h-full"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Card className="bg-slate-800 border-slate-800 p-8 shadow-xl h-full">
                            <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
                                Send us a message
                            </h2>

                            {formSubmitted ? (
                                <motion.div
                                    className="text-center py-12"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                        <Send className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-medium text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-300 mb-6">
                                        Thank you for contacting us. We&apos;ll get back to you as soon as possible.
                                    </p>
                                    <Button
                                        onClick={() => setFormSubmitted(false)}
                                        variant="outline"
                                    >
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <Form {...form}>
                                    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="user_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-300">Name</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                                    <User className="h-5 w-5 text-gray-400" />
                                                                </div>
                                                                <Input
                                                                    placeholder="Your name"
                                                                    className="pl-10"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-300">Email</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                                </div>
                                                                <Input
                                                                    placeholder="Your email"
                                                                    className="pl-10"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="user_phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-300">
                                                            Phone (Optional)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                                    <Phone className="h-5 w-5 text-gray-400" />
                                                                </div>
                                                                <Input
                                                                    placeholder="Your phone number"
                                                                    className="pl-10"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="mail_subject"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-300">Subject</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                                    <MessageSquare className="h-5 w-5 text-gray-400" />
                                                                </div>
                                                                <Input
                                                                    placeholder="Message subject"
                                                                    className="pl-10"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="user_message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Your message"
                                                            rows={4}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex items-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>Processing<span className="animate-pulse">...</span></>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="h-4 w-4 ml-1" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactUsPage;