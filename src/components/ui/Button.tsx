import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";

type Base = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkButton = Base & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

type NativeButton = Base &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function Button(props: LinkButton | NativeButton) {
  const { children, variant = "primary", className = "" } = props;
  const cls = `${styles.btn} ${styles[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as NativeButton;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
