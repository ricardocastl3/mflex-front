"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils-ui";

const InputVariants = cva(
  "flex gap-2 z-0 items-center disabled:cursor-not-allowed  whitespace-nowrap rounded-md transition-colors  disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "px-4 py-2.5 text-sm focus:ring-offset-1 rounded-lg bg-transparent text-slate-800 dark:text-slate-100 border-[1.8px]",
      },
      weight: {
        sm: "h-[36px] w-[120px] px-[15px] py-[18px] text-[0.8rem] focus:ring-1",
        md: "h-[48px] w-[140px] px-[15px] py-[18px] text-[0.9rem] focus:ring-1",
        lg: "h-[50px] w-[150px] px-[15px] py-[18px] text-[0.9rem] focus:ring-1",
      },
      shadow: {
        none: "shadow-none",
        default: "",
        destrutive: "",
        primary: "",
      },
    },
    defaultVariants: {
      variant: "default",
      weight: "md",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  asChild?: boolean;
  requiredField?: boolean;
}

const TextFieldDefault = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      weight,
      asChild = false,
      requiredField = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "input";
    return (
      <>
        <Comp
          className={
            cn(InputVariants({ variant, weight, className })) +
            ` ${
              requiredField
                ? "border-red-500 dark:border-red-800/80 focus:ring-red-800/40 dark:focus:ring-red-800/80 dark:focus:ring-offset-red-500 focus:ring-offset-red-200 "
                : "border-slate-300 dark:border-slate-700/80 focus:ring-yellow-800/40 focus:ring-offset-yellow-600"
            } `
          }
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

TextFieldDefault.displayName = "TextFieldDefault";

export { TextFieldDefault, InputVariants };
