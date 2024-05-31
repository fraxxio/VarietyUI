import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  className,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={cn(buttonVariants({ variant }), className)}>
      {children}
    </button>
  );
}

const buttonVariants = cva("py-2 px-4 rounded font-medium", {
  variants: {
    variant: {
      primary:
        "bg-black text-white duration-200 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300",
      secondary:
        "border border-black border-opacity-30 duration-200 text-black hover:text-gray-800 hover:border-opacity-50 dark:text-white dark:hover:text-gray-300 dark:border-white dark:border-opacity-40 dark:hover:border-opacity-50",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
