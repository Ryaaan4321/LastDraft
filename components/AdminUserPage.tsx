"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAdminUsers } from '@/hooks/use-admin'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
export default function AdminUsersPage() {
    const { users, loading } = useAdminUsers()

    if (loading) {
        return (
            <div className="p-4">
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Joined At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.image} alt="LD" />
                                    <AvatarFallback>{user.fullName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">{user.fullName || "N/A"}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
