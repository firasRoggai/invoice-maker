"use client";

import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { UseFormGetValues, UseFormReturn, UseFormSetValue } from "react-hook-form";
import { Button } from "~/components/ui/button";
import type { InvoiceObjectType, tableItem } from "~/types";
import CustomForm from "./CustomForm";


const TableRow = ({ item, setValue, getValues }: { item: tableItem, setValue: UseFormSetValue<InvoiceObjectType>, getValues: UseFormGetValues<InvoiceObjectType> }) => {

    const currency = getValues("currency.value");

    interface recalculatTotalProps  {
        getValues : UseFormGetValues<InvoiceObjectType>,
        setValue : UseFormSetValue<InvoiceObjectType>,
        index : number,
    }

    const recalculatTotal = ({ getValues, setValue , index } : recalculatTotalProps) => {

        // update single row
        const quantity = Number(getValues(`items.${index}.quantity`));
        const unit_cost = Number(getValues(`items.${index}.unit_cost`));

        setValue(`items.${index}.amount`, quantity * unit_cost);

        // update sub-total and total
    }
    return (
        <tr className="grid grid-cols-12">
            <td className="col-span-6">
                <CustomForm target={`items.${item.index}.name`} className="rounded-e-none" />
            </td>
            <td className="col-span-2">
                <CustomForm
                    onChange={(e) => {
                        const target = e.currentTarget as HTMLInputElement;
                        setValue(`items.${item.index}.quantity`, Number(target.value))
                        recalculatTotal({setValue , getValues , index : item.index})
                    }}
                    type="number" target={`items.${item.index}.quantity`} className="rounded-e-none rounded-s-none" />
            </td>
            <td className="col-span-2">
                <CustomForm
                    type="number" target={`items.${item.index}.unit_cost`} className="rounded-e-none rounded-s-none" />
            </td>
            <td className="col-span-2 flex justify-end items-center pr-1">
                {currency}{" "}{item.amount.toFixed(2)}
            </td>
        </tr>
    )
}

interface ItemTableProps {
    form: UseFormReturn<InvoiceObjectType>
}

const ItemsTable = ({ form }: ItemTableProps) => {

    form.setValue("amount_header" , "")
    const { setValue, getValues, formState: { errors } } = form;

    const tableItems = form.watch("items");
    const title = form.watch();
    console.log(tableItems);

    const [itemsCounter, setItemsCounter] = useState(1)

    useEffect(() => {
        console.log("BASE");
    }, [title])


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
                        tableItems.map((item) => {
                            return (
                                <TableRow key={item.index} item={item} setValue={form.setValue} getValues={form.getValues} />
                            )
                        })
                    }
                </tbody>
            </table>

            <Button
                onClick={(e) => {
                    e.preventDefault()

                    form.setValue(`items.${itemsCounter}`, {
                        quantity: 0,
                        name: "",
                        description: "",
                        unit_cost: 0,
                        amount: 0,
                        index: itemsCounter
                    })

                    setItemsCounter(itemsCounter + 1)
                }}
                className="flex items-center justify-center">
                <PlusIcon />
                Add Line
            </Button>
        </>
    );
}

export default ItemsTable;