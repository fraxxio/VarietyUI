import { cn } from "../lib/utils";
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
      primary: "bg-black text-white",
      secondary: "border border-black border-opacity-30",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
