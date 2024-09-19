import { ReactNode } from "react";

export type ComponentsGenericProps<T = unknown> = T & {
  children: ReactNode;
  className?: string;
  isMobile?: boolean;
};
