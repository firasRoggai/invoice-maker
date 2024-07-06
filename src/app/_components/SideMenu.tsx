import { ArrowDownToLine } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Button } from "~/components/ui/button";
import type { InvoiceObjectType } from "~/types";

interface SideMenuProps {
    form: UseFormReturn<InvoiceObjectType>
}

// react-select
const options = [
    { value: '$', label: 'USD ($)' },
    { value: '£', label: 'EURO (£)' },
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

    const { control } = form;

    return (
        <>
            <div className="h-[100vh] w-[20%] border border-black p-3">
                {/* download invoice */}
                <Button className="gap-x-2 rounded-none w-full text-lg font-normal py-8 bg-blue-500">
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
                                <Select instanceId={""} {...field} options={options} defaultValue={{ value: '$', label: 'USD ($)' }} />
                            )
                        }} />
                </div>

                {/* TYPE */}
                <div className='py-4'>
                    <div className='py-1 uppercase'>TYPE</div>
                    <Select
                        options={typeOptions}
                        onChange={(value) => { form.setValue('header' , value?.value ?? "") }}
                        defaultValue={{ value: 'invoice', label: 'Invoice' }} />
                </div>

                {/* save default */}
                <Button className="p-1" variant={"link"}>Save Default</Button>

                {/* save template */}
                <Button className="gap-x-2 rounded-none w-full text-lg justify-start font-normal py-5 bg-blue-500">
                    History
                </Button>

            </div>
        </>
    );
}

export default SideMenu;