"use client"

import { useAiUsers, useDownLoadFeatures } from "@/hooks/use-admin"
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

export default function DownloadUserPage() {
    const { downloadUsers, loading, error } = useDownLoadFeatures();
    if (loading) {
        return (
            <Card className="p-6">
                <Skeleton className="h-6 w-40 mb-4" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Email</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Payment Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(3)].map((_, idx) => (
                            <TableRow key={idx}>
                                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
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
    } return (
        <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Download Feature Users</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User Email</TableHead>
                        <TableHead>Resume Title</TableHead>
                        <TableHead>Payment Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {downloadUsers.map((entry: any) => (
                        <TableRow key={entry.id}>
                            <TableCell className="font-medium">{entry.user.email}</TableCell>
                            <TableCell>{entry.resume.title}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{entry.paymentType}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
