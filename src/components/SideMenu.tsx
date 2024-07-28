import { PDFDownloadLink } from "@react-pdf/renderer";
import { ArrowDownToLine } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Button } from "~/components/ui/button";
import type { InvoiceObjectType, reactSelect } from "~/types/types";
import InvoiceDocument from "./InvoiceDocument";
// import options from "~/lib/currencies.json"

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


    const data = getValues();

    return (
        <>
            <div className="lg:h-[100vh] lg:w-[20%] lg:border lg:border-black p-3">
                {/* download invoice */}
                <PDFDownloadLink
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

                {/* save default */}
                <Button
                    onClick={() => {
                        const values = JSON.stringify(getValues());
                        localStorage.setItem("invoiceObject", values);
                    }}
                    className="p-1"
                    variant={"link"}>Save Default</Button>

                {/* get saved templates */}
                <Button
                    onClick={() => {
                        const invoiceJSON = localStorage.getItem("invoiceObject");

                        if (!invoiceJSON) return

                        const invoice = JSON.parse(invoiceJSON) as InvoiceObjectType;
                        // date & due_date become string after conversion , and had to be converted to a date again
                        reset({ ...invoice, due_date: new Date(invoice.due_date as unknown as string), date: new Date(invoice.date as unknown as string) }, {
                            keepIsValid: true
                        })
                    }}
                    className="gap-x-2 rounded-none w-full text-lg justify-start font-normal py-5">
                    History
                </Button>

            </div>
        </>
    );
}

export default SideMenu;