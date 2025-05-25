import { createContext } from "react";
import { ConfirmationDialogProps } from "./Confirmation.provider";

// Define the context type
export type ConfirmationContextType = (options: Omit<ConfirmationDialogProps, 'isOpen'>) => void;

// Create the context with an undefined default value
export const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);