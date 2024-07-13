"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import type { Control } from "react-hook-form";
import { Button } from "~/components/ui/button";

type FormValues = {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "cart",
    control
  });
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};

export default function App() {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: "onBlur"
  });

  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control
  });

  console.log(errors);
  
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <input
                  placeholder="name"
                  {...register(`cart.${index}.name` as const, {
                    required: true
                  })}
                  className={errors?.cart?.[index]?.name ? "error" : "" + "border border-black m-4"}
                />
                <input
                  placeholder="quantity"
                  type="number"
                  {...register(`cart.${index}.quantity` as const, {
                    required: true
                  })}
                  className={errors?.cart?.[index]?.quantity ? "border-red-600" : ""}
                />
                <input
                  placeholder="value"
                  type="number"
                  {...register(`cart.${index}.price` as const, {
                    required: true
                  })}
                  className={errors?.cart?.[index]?.price ? "error" : "" + "border border-black m-4"}
                />
                <Button type="button" onClick={() => remove(index)}>
                  DELETE
                </Button>
              </section>
            </div>
          );
        })}

        <Total control={control} />

        <Button
          type="button"
          onClick={() =>
            append({
              name: "",
              quantity: 0,
              price: 0
            })
          }
        >
          APPEND
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}