import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils-ui";

const boxVariants = cva("", {
  variants: {
    variant: {
      whiteboard:
        "bg-slate-400 border rounded-xl dark:bg-slate-700 box-border dark:border dark:border-slate-800/60",
      backboard:
        "bg-white rounded-2xl box-border dark:bg-[#0f121c] dark:border dark:border-slate-800/80",
    },
  },
  defaultVariants: {
    variant: "backboard",
  },
});

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean;
  shadow?: boolean;
}

const BaseBox = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, asChild = false, shadow, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(boxVariants({ className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

BaseBox.displayName = "BaseBox";

export { BaseBox, boxVariants };
