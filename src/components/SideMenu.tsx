"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ArrowDownToLine } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Button } from "~/components/ui/button";
import type { InvoiceObjectType, reactSelect } from "~/types/types";
import InvoiceDocument from "./InvoiceDocument";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Input } from "./ui/input";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useToast } from "./ui/use-toast";



interface SideMenuProps {
    form: UseFormReturn<InvoiceObjectType>
}

const filterColors = (inputValue: string, options: reactSelect[]) => {
    return options.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = async (inputValue: string) => {
    const optionsRaw = await fetch("/api/currencies");

    const options = await optionsRaw.json() as reactSelect[];

    return filterColors(inputValue, options);
};

const options = [
    { value: '$', label: 'USD ($)' },
    { value: '£', label: 'EURO (£)' },
    { value: '¥', label: 'JPY ($)' },
    { value: 'BHD', label: 'BHD' }
]

const typeOptions = [
    { value: 'invoice', label: 'Invoice' },
    { value: 'credit note', label: 'Credit note' },
    { value: 'quote', label: 'Quote' },
    { value: 'purchase order', label: 'Purchase Order' },
    { value: 'recipt', label: 'Recipt' },
]


const SideMenu = ({ form }: SideMenuProps) => {

    const { control, getValues, reset, watch } = form;
    const [templateName, setTemplateName] = useState("untitled")
    const { toast } = useToast()

    const data = getValues();

    const { mutate: createTemplate } = api.invoice.createTemplate.useMutation()

    const addTemplate = () => {
        const template = form.getValues();

        createTemplate({
            name: templateName,
            invoiceObject: JSON.stringify(template)
        }, {
            onSuccess: () => {
                toast({
                    title: "You Added a template!",
                    description: `Your template "${templateName}" was added successfully.`,
                })
            }
        })

    }

    const { mutate: createInvoice } = api.invoice.create.useMutation()


    return (
        <>
            <div className="lg:h-[100vh] lg:w-[20%] lg:border lg:border-black p-3">
                {/* download invoice */}
                <PDFDownloadLink
                    onClick={() => {
                        createInvoice({
                            from: data.from,
                            to: data.to,
                            balance_due: data.balance,
                            currency: data.currency.value,
                            invoiceData: data,
                        }, {
                            onSuccess: () => {
                                toast({
                                    title: "You made an invoice!",
                                    description: `Your invoice was added successfully.`,
                                })
                            }
                        })
                    }}
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90 gap-x-2 rounded-none w-full text-lg font-normal py-8"
                    document={<InvoiceDocument invoiceObject={data} />} fileName="somename.pdf">
                    <ArrowDownToLine className="text-xl" />
                    Download Invoice
                </PDFDownloadLink>

                {/* Currency */}
                <div className='py-4 mt-3'>
                    <div className='py-1 uppercase'>Currency</div>
                    <Controller
                        control={control}
                        name="currency"
                        render={({ field }) => {
                            return (
                                <AsyncSelect instanceId={"react-select-3-live-region"} {...field} cacheOptions defaultOptions={options} loadOptions={promiseOptions} />
                            )
                        }} />
                </div>

                {/* TYPE */}
                <div className='py-4'>
                    <div className='py-1 uppercase'>TYPE</div>
                    <Select
                        options={typeOptions}
                        instanceId={"react-select-5-live-region"}
                        onChange={(value) => { form.setValue('header', value?.value ?? "") }}
                        defaultValue={{ value: 'invoice', label: 'Invoice' }} />
                </div>

                {/* save template */}
                <AlertDialog>
                    <AlertDialogTrigger className="hover:underline p-1 text-sm font-semibold text-blue-600">
                        Save Template
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Save Template</AlertDialogTitle>
                            <AlertDialogDescription>Template name:</AlertDialogDescription>
                            <Input
                                value={templateName}
                                onChange={(e) => {
                                    setTemplateName(e.target.value)
                                }} type="text" />
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction type="button" onClick={addTemplate}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* get saved templates */}
                <AlertDialog>
                    <AlertDialogTrigger className="gap-x-2 rounded-none w-full text-lg justify-start font-normal py-3 bg-primary text-white">
                        History
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Get Template</AlertDialogTitle>
                            <AlertDialogDescription>Recent Templates:</AlertDialogDescription>
                            
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction type="button" onClick={addTemplate}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </>
    );
}

export default SideMenu;