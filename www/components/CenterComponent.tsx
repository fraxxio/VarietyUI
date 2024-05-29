import React from "react";

type CenterComponentProps = React.HTMLAttributes<HTMLDivElement>;

export default function CenterComponent({
  children,
  ...props
}: CenterComponentProps) {
  return (
    <div
      {...props}
      className="my-4 grid min-h-52 w-[70%] place-items-center rounded border border-neutral-400 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900"
    >
      {children}
    </div>
  );
}
