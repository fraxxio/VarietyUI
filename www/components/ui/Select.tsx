import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
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
  defaultItem?: {
    label: string;
    value: string;
  };
};

type SelectContextType = {
  selectedValue: {
    title: string;
    value: string;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSelectedValue: (value: string, title: string) => void;
  variant: Variant;
  size: Size;
  theme?: Theme;
};

const Icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

const modernVariants = cva("cursor-pointer rounded ", {
  variants: {
    variant: {
      primary:
        "border border-neutral-400 hover:border-neutral-600 hover:text-neutral-950 hover:dark:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800",
      ghost: "",
    },
    size: {
      xs: "text-xs [&_.trigger]:px-1.5 [&_.trigger]:py-1",
      sm: "text-sm [&_.trigger]:px-1.5 [&_.trigger]:py-1",
      md: "[&_.trigger]:px-2 [&_.trigger]:py-1",
      lg: "[&_.trigger]:px-2.5 [&_.trigger]:py-1.5 text-lg",
      xl: "[&_.trigger]:px-3 [&_.trigger]:py-2 text-xl",
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
        "absolute top-8 left-0 border border-neutral-400  dark:border-neutral-700 dark:bg-neutral-900 max-h-60 overflow-auto",
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
  defaultItem,
  onValueChange,
  ...props
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(
    defaultItem?.value
      ? { title: defaultItem.label, value: defaultItem.value }
      : { title: "", value: "" },
  );
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const appliedTheme: Theme = theme || defaultTheme;
  const selectedVariants = parentThemeVariants[appliedTheme];

  if (!selectedVariants) {
    console.error(`Invalid theme: ${appliedTheme}`);
    return null;
  }

  const handleSelectedValue = (value: string, title: string) => {
    setSelectedValue({ value, title });
    if (onValueChange) onValueChange(value);
  };

  const contextValues = useMemo(
    () => ({
      selectedValue,
      isOpen,
      setIsOpen,
      handleSelectedValue,
      variant,
      size,
      theme,
    }),
    [selectedValue, isOpen, handleSelectedValue, variant, size, theme],
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <SelectContext.Provider value={contextValues}>
      <div
        ref={selectRef}
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
      className={cn(
        "trigger flex items-center justify-between gap-2",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {selectedValue.value ? (
        <>
          Selected:{" "}
          <small className="max-w-16 truncate">{selectedValue.title}</small>{" "}
          {Icon}
        </>
      ) : (
        <>
          {children} {Icon}
        </>
      )}
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

  const handleClick = () => {
    if (typeof children !== "string") {
      throw new Error("Select.Item children must be a single string.");
    }
    handleSelectedValue(value, children);
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleClick}
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
