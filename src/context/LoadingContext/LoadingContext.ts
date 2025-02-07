import { createContext } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void
}

const defaultValues: LoadingContextType = {
    isLoading: false,
    setIsLoading: () => { }
}

export const LoadingContext = createContext<LoadingContextType>(defaultValues);