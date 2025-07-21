"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardDescription, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { Download, Sparkles, CreditCard } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"

declare global {
    interface Window {
        Razorpay: any
    }
}
// type PaymentType = "DOWNLOAD" | "AI_BULLETS"
export default function PaymentPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const paymentType = searchParams.get("type") as "download" | "ai_bullets"
    const resumeId = searchParams.get("resumeId")

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/getuser", {
                    method: "GET",
                    credentials: "include",
                })
                const data = await res.json()
                if (!data.user) {
                    router.push("/auth/signin")
                    return
                }
                setUser(data.user)
            } catch (err) {
                console.error("Error fetching user:", err)
                router.push("/auth/signin")
            }
        }
        getUser()
    }, [])
    useEffect(() => {
        const checkifAlreadyPaid = async () => {
            if (!user || !paymentType || !resumeId) return;
            const res = await fetch('/api/payment/check', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeId, paymentType })
            })
            const data = await res.json();
            if (data?.alreadyPaid) {
                if (paymentType === "download") {
                    window.open(`/api/resume/download/${resumeId}`, "_blank");
                } else if (paymentType === "ai_bullets") {
                    router.push(`/resume/${resumeId}/ai-bullets`);
                }
            }
        }
        if (user) checkifAlreadyPaid();
    }, [user])
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const getPaymentDetails = () => {
        switch (paymentType) {
            case "download":
                return {
                    title: "Download Resume PDF",
                    description: "Get a professionally formatted PDF of your resume",
                    amount: 149,
                    icon: Download,
                }
            case "ai_bullets":
                return {
                    title: "AI Bullet Points",
                    description: "Generate professional bullet points using AI",
                    amount: 149,
                    icon: Sparkles,
                }
            default:
                return null
        }
    }

    const handlePayment = async () => {
        if (!user || !resumeId || !paymentType) return
        setLoading(true)
        try {
            const response = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: getPaymentDetails()?.amount,
                    currency: "INR",
                    paymentType,
                    resumeId,
                }),
            })

            const order = await response.json()

            if (!order.success) {
                throw new Error(order.error)
            }
            console.log("key id = ", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.data.amount,
                currency: order.data.currency,
                name: "Resume Builder",
                description: getPaymentDetails()?.description,
                order_id: order.data.id,
                handler: async (response: any) => {
                    try {
                        const verifyResponse = await fetch("/api/payment/verify", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                paymentType,
                                resumeId,
                            }),
                        })

                        const verifyResult = await verifyResponse.json()
                        console.log("verify result = ", verifyResult);
                        if (verifyResult.success === true) {
                            console.log("resume id from the payment page = ", resumeId);
                            console.log("inside tht success of the verify ");
                            toast.success("Payment successful!")
                            if (paymentType === "download") {
                                if (paymentType === "download") {
                                    window.open(`/api/resume/temp-download/${resumeId}`, "_blank")
                                }
                            } else if (paymentType === "ai_bullets") {
                                router.push(`/resume/${resumeId}/aibullets`)
                            }
                        } else {
                            toast.error("Payment verification failed")
                        }

                    } catch (e: any) {
                        console.error("❗ Error inside Razorpay handler:", e.message)
                        toast.error("Something went wrong during payment verification")
                    }
                },
                prefill: {
                    email: user.email,
                },
                theme: {
                    color: "#000000",
                },
            }
            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error) {
            toast.error("Payment failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const paymentDetails = getPaymentDetails()

    if (!paymentDetails) {
        return <div>Invalid payment type</div>
    }

    const Icon = paymentDetails.icon
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12  rounded-full flex items-center justify-center mb-4 bg-[#FA6600]">
                        <Icon className="w-6 h-6 text-white " />
                    </div>
                    <CardTitle>{paymentDetails.title}</CardTitle>
                    <CardDescription>{paymentDetails.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-900">₹{(paymentDetails.amount).toFixed(2)}</div>
                        <p className="text-sm text-gray-600">One-time payment</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Secure payment with Razorpay</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Instant access after payment</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>No recurring charges</span>
                        </div>
                    </div>

                    <Button onClick={handlePayment} disabled={loading} className="w-full bg-[#FA6600] text-white cursor-pointer" >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {loading ? "Processing..." : `Pay ₹${(paymentDetails.amount / 100).toFixed(2)}`}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                        By proceeding, you agree to our terms of service and privacy policy.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
