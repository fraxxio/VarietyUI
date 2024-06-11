import React from "react";
import Button from "./ui/Button";

type PreviewComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  component: string;
  variant: string;
};

const componentMap = {
  Button: Button,
};

export default function PreviewComponent({
  children,
  component,
  variant = "primary",
  ...props
}: PreviewComponentProps) {
  const Preview = componentMap[component];
  return (
    <div
      {...props}
      className="my-4 grid min-h-52 w-[70%] place-items-center rounded border border-neutral-400 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900"
    >
      {Preview ? <Preview variant={variant}>{children}</Preview> : null}
    </div>
  );
}
