import { useFormContext } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import type { InvoiceObjectType } from "~/types";
import CustomForm from "./CustomForm";
import SwitchForm from "./SwitchForm";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { recalculatTotal } from "~/lib/utils";

const PriceAdjustment = () => {
    const { setValue, getValues, watch } = useFormContext<InvoiceObjectType>();
    const fields = watch("fields");

    return (
        <div className="grid justify-end space-y-2">
            {/* tax */}
            {fields.tax != "none" &&
                <div className="flex items-center gap-x-2">
                    <CustomForm
                        target={"tax_title"}
                        className="w-[7rem] text-gray-500"
                        border="none"
                    />
                    <SwitchForm
                        type="number"
                        onChange={(e) => {
                            const target = e.currentTarget as HTMLInputElement;
                            setValue(`tax`, Number(target.value))
                            recalculatTotal({ setValue, getValues })
                        }}
                        target="tax"
                        ring="none"
                        className="w-[10rem] rounded-e-none rounded-s-none" />

                    <button
                        aria-label="close"
                        type="button"
                        onClick={() => {
                            if (fields.tax == "none") setValue("fields.tax", "currency")
                            else {
                                setValue("fields.tax", "none")
                                setValue("tax", 0)
                                recalculatTotal({ setValue, getValues })
                            };
                        }}>
                        <IoIosClose className="text-xl" />
                    </button>
                </div>
            }

            {/* discounts */}
            {fields.discounts != "none" &&
                <div className="flex items-center gap-x-2">
                    <CustomForm
                        target={"discounts_title"}
                        className="w-[7rem] text-gray-500"
                        border="none"
                    />
                    <SwitchForm
                        onChange={(e) => {
                            const target = e.currentTarget as HTMLInputElement;
                            setValue(`discounts`, Number(target.value))
                            recalculatTotal({ setValue, getValues })
                        }}
                        type="number"
                        target="discounts"
                        ring="none"
                        className="w-[10rem] rounded-e-none rounded-s-none" />

                    <button
                        aria-label="close"
                        type="button"
                        onClick={() => {
                            if (fields.discounts == "none") setValue("fields.discounts", "currency")
                            else {
                                setValue("fields.discounts", "none");
                                setValue("discounts", 0);
                                recalculatTotal({ setValue, getValues })
                            };
                        }}>
                        <IoIosClose className="text-xl" />
                    </button>
                </div>
            }

            {/* shipping */}
            {fields.shipping != "none" &&
                <div className="flex items-center justify-end gap-x-2">
                    <CustomForm
                        target={"shipping_title"}
                        className="w-[7rem] text-gray-500"
                        border="none"
                    />
                    <SwitchForm
                        onChange={(e) => {
                            const target = e.currentTarget as HTMLInputElement;
                            setValue(`shipping`, Number(target.value))
                            recalculatTotal({ setValue, getValues })
                        }}
                        type="number"
                        target="shipping"
                        ring="none"
                        className="w-[10rem] rounded-e-none rounded-s-none" />

                    <button
                        aria-label="close"
                        type="button"
                        onClick={() => {
                            if (fields.shipping == "none") setValue("fields.shipping", "currency")
                            else {
                                setValue("fields.shipping", "none")
                                setValue("shipping", 0);
                                recalculatTotal({ setValue, getValues })
                            };
                        }}>
                        <IoIosClose className="text-xl" />
                    </button>
                </div>
            }
            <div className="flex">
                {
                    (Object.keys(fields) as (keyof InvoiceObjectType["fields"])[]).map((key) => {
                        if (fields[key] == "none") {
                            return (
                                <Button className="flex items-center" onClick={() => { setValue(`fields.${key}`, "currency") }} variant={"link"} key={key}>
                                    <PlusIcon className="w-4 me-1" />{"  "} {key}
                                </Button>
                            );
                        }
                    })
                }
            </div>
        </div>
    );
}

export default PriceAdjustment;