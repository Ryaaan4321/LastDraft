"use client"
import { useEffect, useState } from "react";
import { boolean } from "zod";
interface PaymentTypeGroup {
    paymentType: "DOWNLOAD" | "AI_BULLETS";
    _sum: {
        amount: number | null;
    };
}

interface ApiResponse {
    success: boolean;
    msg: string;
    totalsByType: PaymentTypeGroup[];
}
interface User {
    id: string
    email: string
}

interface Payment {
    id: string
    userId: string
    resumeId: string
    paymentType: string
    status: string
    user: User
}

interface UseAdminUsersResult {
    users: User[]
    loading: boolean
}
interface Resume {
    id: string
    title: string
}

interface AiUser {
    id: string
    paymentType: string
    user: User
    resume: Resume
}
interface DownloadUser {
    id: string
    paymentType: string
    user: User
    resume: Resume
}

interface UseAiUsersResult {
    aiUsers: AiUser[]
    loading: boolean
    error: string | null
}
interface UseDownloadResult {
    downloadUsers: DownloadUser[]
    loading: boolean
    error: string | null
}

export function useWholeTransaction() {
    const [totalT, setTotalT] = useState<number>(0);
    const [loadingone, setLoadingOne] = useState<boolean>(true);
    const [errOne, setErrOne] = useState<string | null>(null);
    console.log("totalT = ", totalT);
    useEffect(() => {
        async function fetchdata() {
            try {
                const res = await fetch('/api/admin/totalearnings');
                const data = await res.json();
                if (data.success && data.totalEarnings?._sum?.amount) {
                    setTotalT(data.totalEarnings._sum.amount);
                } else {
                    setErrOne("no data found")
                }
                setLoadingOne(false);
            } catch (e: any) {
                setErrOne("failed to fetch the earnings")
                setLoadingOne(false);
            }
        }
        fetchdata();
    }, [])
    return { totalT, loadingone, errOne }
}

export function useTransactionBreakdown() {
    const [dataTwo, setDataTwo] = useState<PaymentTypeGroup[]>([]);
    const [loadingTwo, setLoadingTwo] = useState<boolean>(true);
    const [errTwo, setErrTwo] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBreakdown() {
            try {
                const res = await fetch("/api/admin/transactionbreakdown");
                const result: ApiResponse = await res.json();

                if (result.success && result.totalsByType) {
                    setDataTwo(result.totalsByType);
                } else {
                    setErrTwo(result.msg || "No data found");
                }
            } catch (err) {
                setErrTwo("sryy we messsed up");
            } finally {
                setLoadingTwo(false);
            }
        }

        fetchBreakdown();
    }, []);

    return { dataTwo, loadingTwo, errTwo };
}
export function useAdminPayments() {
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPayments() {
            try {
                const res = await fetch("/api/admin/paymentstatus")
                const data = await res.json()

                if (!res.ok) throw new Error(data.msg || "Failed to fetch")

                setPayments(data.payments)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPayments()
    }, [])

    return { payments, loading, error }
}
export function useAdminUsers(): UseAdminUsersResult {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/admin/users')
                const data = await res.json()

                if (!res.ok || !data.success) {
                    throw new Error(data.msg || 'its us not you')
                }

                setUsers(data.data)
            } catch (err: any) {
                setUsers([])
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    return { users, loading }
}


export function useAiUsers(): UseAiUsersResult {
    const [aiUsers, setAiUsers] = useState<AiUser[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAiUsers = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/admin/aifeature')
                const data = await res.json()

                if (!res.ok || !data.success) {
                    throw new Error(data.msg || 'Failed to fetch AI users')
                }

                setAiUsers(data.aiusers)
                setError(null)
            } catch (err: any) {
                setError(err.message || 'Unknown error')
                setAiUsers([])
            } finally {
                setLoading(false)
            }
        }

        fetchAiUsers()
    }, [])

    return { aiUsers, loading, error }
}
export function useDownLoadFeatures(): UseDownloadResult {
    const [downloadUsers, setDownloadUsers] = useState<DownloadUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchAiUsers = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/admin/downloadfeature')
                const data = await res.json()

                if (!res.ok || !data.success) {
                    throw new Error(data.msg || 'Failed to fetch AI users')
                }

                setDownloadUsers(data.aiusers)
                setError(null)
            } catch (err: any) {
                setError(err.message || 'Unknown error')
                setDownloadUsers([])
            } finally {
                setLoading(false)
            }
        }

        fetchAiUsers()
    }, [])
    return {downloadUsers,loading,error}
}

