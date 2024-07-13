import { ArrowDownToLine } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Button } from "~/components/ui/button";
import type { InvoiceObjectType, reactSelect } from "~/types";
// import options from "~/lib/currencies.json"

interface SideMenuProps {
    form: UseFormReturn<InvoiceObjectType>
}

const filterColors = (inputValue: string , options : reactSelect[]) => {
    return options.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = async (inputValue : string) => {
    const optionsRaw= await fetch("/api/currencies");

    const options = await optionsRaw.json() as reactSelect[];

    return filterColors(inputValue , options);
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

    const { control, getValues , reset } = form;

    return (
        <>
            <div className="lg:h-[100vh] lg:w-[20%] lg:border lg:border-black p-3">
                {/* download invoice */}
                <Button
                type="submit"
                className="gap-x-2 rounded-none w-full text-lg font-normal py-8">
                    <ArrowDownToLine className="text-xl" />
                    Download Invoice
                </Button>

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

                {/* save template */}
                <Button
                onClick={() => {
                    const invoiceJSON = localStorage.getItem("invoiceObject");

                    if(!invoiceJSON) return

                    const invoice = JSON.parse(invoiceJSON) as InvoiceObjectType;
                    reset(invoice , {
                        keepIsValid : true
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