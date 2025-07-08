"use client"
import { getCurrentUser } from "@/app/actions/auth.actions";
import { JwtUserPayload } from "@/app/actions/auth.actions";
import { useEffect, useState } from "react";

export function useUser(){
    const [userData,setUserData]=useState<JwtUserPayload|null>(null);
    const [userLoading,setUserLoading]=useState(true);
    useEffect(()=>{
        async function fetchUser() {
            const data=await getCurrentUser();
            console.log("Data from the hook = ",data);
            if(!data){
                return { success: false, msg: "sorry we couldn't find the user" }
            }
            setUserData({
                id:data.id,
                email:data.email
            })
            setUserLoading(false);
        }
        fetchUser();
    },[])
    return {userData,userLoading};
}