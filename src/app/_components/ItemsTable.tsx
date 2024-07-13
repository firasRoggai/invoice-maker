"use client";

import { useFieldArray } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { recalculatTotal } from "~/lib/utils";
import CustomForm from "./CustomForm";
import IconForm from "./IconForm";

// icons
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

// types
import type { UseFieldArrayRemove, UseFormGetValues, UseFormReturn, UseFormSetValue } from "react-hook-form";
import type { InvoiceObjectType } from "~/types";

interface TableRowProps {
    index: number,
    setValue: UseFormSetValue<InvoiceObjectType>,
    getValues: UseFormGetValues<InvoiceObjectType>,
    remove: UseFieldArrayRemove,
}

const TableRow = ({ setValue, getValues, remove, index }: TableRowProps) => {

    const currency = getValues("currency.value");
    const items = getValues(`items`);
    const item = items[index]
    const itemsLength = items.length

    return (
        <tr className="grid grid-cols-12 relative">
            <td className="col-span-6">
                <CustomForm target={`items.${index}.name`} className="rounded-e-none" />
            </td>
            <td className="col-span-2">
                <CustomForm
                    onChange={(e) => {
                        const target = e.currentTarget as HTMLInputElement;
                        setValue(`items.${index}.quantity`, Number(target.value))
                        recalculatTotal({ setValue, getValues, index: index })
                    }}
                    type="number" target={`items.${index}.quantity`}
                    className="rounded-e-none rounded-s-none" />
            </td>
            <td className="col-span-2">
                <IconForm
                    onChange={(e) => {
                        const target = e.currentTarget as HTMLInputElement;
                        setValue(`items.${index}.unit_cost`, Number(target.value))
                        recalculatTotal({ setValue, getValues, index: index })
                    }}
                    ring="none"
                    type="number"
                    target={`items.${index}.unit_cost`}
                    className="rounded-e-none rounded-s-none"
                />
            </td>
            <td className="col-span-2 flex justify-end items-center pr-1">
                {currency}{" "}{item?.amount.toFixed(2)}
            </td>
            <td className="absolute -right-5 top-[10] flex justify-center">
                <button
                    aria-label={"close"}
                    onClick={(e) => {
                        e.preventDefault();

                        if (itemsLength == 1) return

                        remove(index)
                        recalculatTotal({ setValue, getValues, index: index })
                    }}>
                    <IoIosClose className="text-xl" />
                </button>
            </td>
        </tr>
    )
}

interface ItemTableProps {
    form: UseFormReturn<InvoiceObjectType>
}

const ItemsTable = ({ form }: ItemTableProps) => {

    const { control } = form;

    const { fields, append, remove } = useFieldArray({
        name: "items",
        control
    });


    const [itemsCounter, setItemsCounter] = useState(1)

    return (
        <>
            <table>
                <thead >
                    <tr className="font-normal grid grid-cols-12">
                        <td className="col-span-6">
                            <CustomForm target="item_header" className="rounded-e-none bg-[#232e38] text-white" />
                        </td>
                        <td className="col-span-2">
                            <CustomForm target="quantity_header" className="rounded-e-none rounded-s-none bg-[#232e38] text-white" />
                        </td>
                        <td className="col-span-2">
                            <CustomForm target="unit_cost_header" className="rounded-e-none rounded-s-none bg-[#232e38] text-white" />
                        </td>
                        <td className="col-span-2">
                            <CustomForm target="amount_header" className="rounded-s-none bg-[#232e38] text-white" />
                        </td>
                    </tr>
                </thead>

                <tbody>
                    {
                        fields.map((item, index) => {

                            const props = {
                                setValue: form.setValue,
                                getValues: form.getValues,
                                remove: remove,
                                index: index,
                            }

                            return (
                                <TableRow key={item.id} {...props} />
                            )
                        })
                    }
                </tbody>
            </table>

            <Button
                onClick={(e) => {
                    e.preventDefault()

                    append({
                        quantity: 0,
                        name: "",
                        description: "",
                        unit_cost: 0,
                        amount: 0,
                    })

                    setItemsCounter(itemsCounter + 1)
                }}
                className="flex items-center justify-center mt-3">
                <PlusIcon />
                Add Line
            </Button>
        </>
    );
}

export default ItemsTable;