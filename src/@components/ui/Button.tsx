import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils-ui";

const buttonVariants = cva(
  "flex gap-2 pt-1.5 pb-0 focus:ring rounded-md text-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white bg-slate-800 border border-slate-200 dark:border-slate-700/80 dark:bg-slate-800/20 hover:bg-slate-800/80 dark:hover:bg-slate-800/80  focus:ring-slate-400 dark:focus:ring-[#182336]",
        destructive:
          "text-white bg-red-500 dark:bg-red-800 hover:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-900 focus:ring-red-300",
        primary:
          "text-white bg-yellow-700 dark:bg-yellow-800 dark:hover:bg-yellow-600 hover:bg-yellow-600 hover:bg-yellow-600 dark:focus:ring-yellow-700 focus:ring-yellow-300",
        green:
          "text-white dark:text-green-300 bg-green-600 dark:bg-green-950 hover:bg-green-500 dark:hover:bg-green-800 dark:focus:ring-green-900 focus:ring-green-300",
        outline:
          "dark:text-white text-slate-600 bg-transparent dark:hover:bg-slate-800/40 hover:bg-slate-100 border border-slate-400 dark:border-slate-200  dark:border-slate-700/80  dark:focus:ring-slate-800 focus:ring-slate-300",
      },
      size: {
        sm: "px-[1rem] pt-[0.6rem] pb-[0.47rem] text-[0.8rem] focus:ring-2",
        md: "px-[1rem] pt-[0.52rem] pb-[0.52rem] text-[0.85rem] focus:ring-2",
        lg: "px-[1rem] py-[0.8rem] text-[0.9rem] focus:ring-2",
        none: "",
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
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
