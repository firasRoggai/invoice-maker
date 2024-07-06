import { cva } from "class-variance-authority";
import { useFormContext } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import type { customFormProps } from "~/types";


const ErrorMessage = ({ error }: { error?: string }) => {
    return (
        <span className="text-xs text-red-600">
            {error}
        </span>
    )
}

const CustomForm = ({ placeholder, target, className, border, size, ring, type, onChange }: customFormProps) => {
    const { register, formState: { errors } } = useFormContext<Record<string, string>>();

    const inputVariant = cva(
        "hover:border-black border-[1px] rounded-sm transition duration-200",
        {
            variants: {
                border: {
                    default: "border-[rgb(206,212,218)]",
                    none: "border-none"
                },
                size: {
                    default: "",
                    sm: "px-1 h-6 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
                },
                ring: {
                    default: "focus-visible:ring-1 focus-visible:ring-offset-0",
                    none: "focus-visible:ring-0"
                }
            },
            defaultVariants: {
                border: "default",
                size: "default",
                ring: "default",
            },
        }
    )

    return (
        <div className="grid border-none">
            <div className={cn(inputVariant({ border: border }))}>
                <Input
                    type={type}
                    className={cn("rounded-sm border-none px-2 h-full", inputVariant({ size: size, ring: ring }), className)}
                    placeholder={placeholder}
                    {...register(target, {
                        valueAsNumber: type == "number",
                    })} 
                    onChange={onChange ?? undefined}
                    />
            </div>
            {errors[target] && <ErrorMessage error={errors[target]?.message} />}
        </div>
    );
}

export default CustomForm;