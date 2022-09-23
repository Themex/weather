import {createContext, useContext} from "react";

export const FiguresContext = createContext<any>({
    data: []
});

export const useFiguresContext = () => {
    const context = useContext(FiguresContext);

    if (context == null) {
        throw new Error("No Figures Context Provided");
    }

    return context;
};