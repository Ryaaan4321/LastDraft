"use client"
import { usePaidUsers } from "@/hooks/use-admin"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function PaidUsersPage() {
    const { paidUsers, loading, error } = usePaidUsers()

    if (loading) {
        return (
            <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Payment Types</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(3)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-56" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="p-6 text-red-600 font-medium">
                Error: {error}
            </Card>
        )
    }

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Paid Users</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Payment Types</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paidUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.email}</TableCell>
                            <TableCell className="flex gap-2 flex-wrap">
                                {user.paymentTypes.map((type) => (
                                    <Badge
                                        key={type}
                                        variant={type === "AI_BULLETS" ? "default" : "secondary"}
                                    >
                                        {type}
                                    </Badge>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
