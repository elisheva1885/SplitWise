import { useContext } from "react";
import { GroupContext } from "../types/group-context.types";

export const useGroupContext = () => {
    const context = useContext(GroupContext);
    if (!context) {
        throw new Error("useGroupContext must be used within a UserProvider");
    }
    return context;
};