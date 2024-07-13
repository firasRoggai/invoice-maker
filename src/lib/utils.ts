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
  index?: number,
}

export const recalculatTotal = ({ getValues, setValue, index }: recalculatTotalProps) => {
  const items = getValues("items");
  const fields = getValues("fields");

  const tax = getValues("tax");
  const discounts = getValues("discounts");
  const shipping = getValues("shipping");
  const amount_paid = getValues("amount_paid");

  // update single row
  if (index != undefined) {
    const quantity = Number(items[index]?.quantity);
    const unit_cost = Number(items[index]?.unit_cost);
    setValue(`items.${index}.amount`, quantity * unit_cost);
  }

  // sub-total
  const subTotalUnitCost = items.reduce((total, item) => total + (item.quantity * item.unit_cost), 0);
  setValue(`subtotal`, subTotalUnitCost);

  // total
  let total = subTotalUnitCost;

  if (fields.shipping != "none") total = total + shipping;

  switch (fields.tax) {
    case "%":
      total = total + (total * tax / 100);
      break;

    case "currency":
      total = total + tax;
      break;
  }

  switch (fields.discounts) {
    case "%":
      total = total - (total * discounts / 100);
      break;

    case "currency":
      total = total - discounts;
      break;
  }

  setValue("total", total)

  // balance due
  setValue("balance", total - amount_paid)

}