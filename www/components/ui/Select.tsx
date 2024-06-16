import React, { createContext, useContext, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import defaultConfig from "../components.json";

type Theme = "modern" | "glassmorphism" | "brutalism";
type Variant = "primary" | "ghost";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
  theme?: Theme;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onValueChange?: (value: string) => void;
};

type SelectContextType = {
  selectedValue: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSelectedValue: (value: string) => void;
  variant: Variant;
  size: Size;
  theme?: Theme;
};

const modernVariants = cva("cursor-pointer rounded ", {
  variants: {
    variant: {
      primary:
        "border border-neutral-400 hover:border-neutral-600 hover:text-neutral-950 hover:dark:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800",
      ghost: "",
    },
    size: {
      xs: "text-xs px-1.5 py-1",
      sm: "text-sm px-1.5 py-1",
      md: "px-2 py-1",
      lg: "px-2.5 py-1.5 text-lg",
      xl: "px-3 py-2 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const modernSelectVariants = cva("rounded", {
  variants: {
    variant: {
      primary:
        "absolute top-8 left-0 border border-neutral-400  dark:border-neutral-700 dark:bg-neutral-900",
      ghost: "",
    },
    size: {
      xs: "text-xs px-1.5 py-1",
      sm: "text-sm px-1.5 py-1",
      md: "px-2 py-1",
      lg: "px-2.5 py-1.5 text-lg",
      xl: "px-3 py-2 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const modernItemVariants = cva("rounded duration-200", {
  variants: {
    variant: {
      primary: "hover:bg-neutral-300 dark:hover:bg-neutral-700",
      ghost: "",
    },
    size: {
      xs: "text-xs px-1.5 py-1",
      sm: "text-sm px-1.5 py-1",
      md: "px-2 py-1",
      lg: "px-2.5 py-1.5 text-lg",
      xl: "px-3 py-2 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const glassmorphismVariants = cva("", {
  variants: {
    variant: {
      primary: "",
      ghost: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const glassmorphismSelectVariants = cva("rounded duration-200", {
  variants: {
    variant: {
      primary: "",
      ghost: "",
    },
    size: {
      xs: "text-xs px-1.5 py-1",
      sm: "text-sm px-1.5 py-1",
      md: "px-2 py-1",
      lg: "px-2.5 py-1.5 text-lg",
      xl: "px-3 py-2 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const glassmorphismItemVariants = cva("rounded duration-200", {
  variants: {
    variant: {
      primary: "",
      ghost: "",
    },
    size: {
      xs: "text-xs px-1.5 py-1",
      sm: "text-sm px-1.5 py-1",
      md: "px-2 py-1",
      lg: "px-2.5 py-1.5 text-lg",
      xl: "px-3 py-2 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const brutalismVariants = cva("", {
  variants: {
    variant: {
      primary: "",
      ghost: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const brutalismSelectVariants = cva("rounded duration-200", {
  variants: {
    variant: {
      primary: "",
      ghost: "",
    },
    size: {
      xs: "text-xs px-1.5 py-1",
      sm: "text-sm px-1.5 py-1",
      md: "px-2 py-1",
      lg: "px-2.5 py-1.5 text-lg",
      xl: "px-3 py-2 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const brutalismItemVariants = cva("rounded duration-200", {
  variants: {
    variant: {
      primary: "",
      ghost: "",
    },
    size: {
      xs: "text-xs px-1.5 py-1",
      sm: "text-sm px-1.5 py-1",
      md: "px-2 py-1",
      lg: "px-2.5 py-1.5 text-lg",
      xl: "px-3 py-2 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext<SelectContextType | undefined>(SelectContext);
  if (!context) {
    throw new Error("Select compound components must be used within a Select");
  }
  return context;
};

const defaultTheme: Theme = defaultConfig.defaultTheme as Theme;

const parentThemeVariants = {
  modern: modernVariants,
  glassmorphism: glassmorphismVariants,
  brutalism: brutalismVariants,
};

const selectThemeVariants = {
  modern: modernSelectVariants,
  glassmorphism: glassmorphismSelectVariants,
  brutalism: brutalismSelectVariants,
};

const itemThemeVariants = {
  modern: modernItemVariants,
  glassmorphism: glassmorphismItemVariants,
  brutalism: brutalismItemVariants,
};

const Select = ({
  children,
  size = "md",
  variant = "primary",
  theme,
  className,
  onValueChange,
  ...props
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const appliedTheme: Theme = theme || defaultTheme;
  const selectedVariants = parentThemeVariants[appliedTheme];

  if (!selectedVariants) {
    console.error(`Invalid theme: ${appliedTheme}`);
    return null;
  }

  const handleSelectedValue = (value: string) => {
    setSelectedValue(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <SelectContext.Provider
      value={{
        selectedValue,
        isOpen,
        setIsOpen,
        handleSelectedValue,
        variant,
        size,
        theme,
      }}
    >
      <div
        {...props}
        className={cn(selectedVariants({ variant, size }), className)}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => {
  const { isOpen, setIsOpen, selectedValue } = useSelectContext();

  return (
    <div
      className="flex items-center justify-between gap-2"
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {"Selected " + selectedValue || children}
    </div>
  );
};

const SelectList = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => {
  const { isOpen, variant, size, theme } = useSelectContext();

  const appliedTheme: Theme = theme || defaultTheme;
  const selectedVariants = selectThemeVariants[appliedTheme];

  return isOpen ? (
    <div
      className={cn(selectedVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  ) : null;
};

const SelectItem = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  const { handleSelectedValue, setIsOpen, theme, variant, size } =
    useSelectContext();

  const appliedTheme: Theme = theme || defaultTheme;
  const selectedVariants = itemThemeVariants[appliedTheme];
  return (
    <div
      onClick={() => {
        handleSelectedValue(value);
        setIsOpen(false);
      }}
      className={cn(selectedVariants({ variant, size }))}
    >
      {children}
    </div>
  );
};

Select.Trigger = SelectTrigger;
Select.List = SelectList;
Select.Item = SelectItem;

export default Select;
