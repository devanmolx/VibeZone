"use client"
import { useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext/UserContext";

function useUpdateUser() {
    const { user, setUser } = useContext(UserContext);

    const updateUser = useCallback(async () => {
        const response = await axios.post("/api/user/me", { token: user._id });
        setUser(response.data.message);
        return response.data.message;
    }, [user, setUser]);

    return updateUser;
}

export default useUpdateUser;
