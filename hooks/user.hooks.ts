"use client"
import { getCurrentUser } from "@/app/actions/auth.actions";
import { JwtUserPayload } from "@/app/actions/auth.actions";
import { useEffect, useState } from "react";

interface Resume {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
export function useResumes() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await fetch("/api/getallresumesofuser", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    setError(errorData.error || "something went wrong");
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setResumes(data);
            } catch (err: any) {
                setError(err.message || "failed to fetch resumes");
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, []);

    return { resumes, loading, error };
}
export function useUser() {
    const [userData, setUserData] = useState<JwtUserPayload | null>(null);
    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
        async function fetchUser() {
            const data = await getCurrentUser();
            
            if (!data) {
                return { success: false, msg: "sorry we couldn't find the user" }
            }
            setUserData({
                id: data.id,
                email: data.email
            })
            setUserLoading(false);
        }
        fetchUser();
    }, [])
    return { userData, userLoading };
}