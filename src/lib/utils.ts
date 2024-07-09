import { type ClassValue, clsx } from "clsx"
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { twMerge } from "tailwind-merge"
import type { InvoiceObjectType } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// calculates the sub-total and total
interface recalculatTotalProps {
  getValues: UseFormGetValues<InvoiceObjectType>,
  setValue: UseFormSetValue<InvoiceObjectType>,
  index: number,
}

export const recalculatTotal = ({ getValues, setValue, index }: recalculatTotalProps) => {

  // update single row
  const quantity = Number(getValues(`items.${index}.quantity`));
  const unit_cost = Number(getValues(`items.${index}.unit_cost`));

  setValue(`items.${index}.amount`, quantity * unit_cost);

  // update sub-total and total
  const items = getValues("items");

  const totalUnitCost = items.reduce((total, item) => total + (item.quantity * item.unit_cost), 0);
  setValue(`total`, totalUnitCost);

}