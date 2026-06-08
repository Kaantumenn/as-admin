import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover disabled:opacity-50",
  ghost:
    "border border-border bg-surface/60 text-white/80 hover:bg-surface hover:text-white disabled:opacity-50",
  danger:
    "border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20 disabled:opacity-50",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
