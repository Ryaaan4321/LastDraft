"use client"
import { useAdminUsers } from '@/hooks/use-admin'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdminUsersPage() {
    const { users, loading } = useAdminUsers()

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="p-4 space-y-4">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {users.map((user:any) => (
                <Card key={user.id} className="p-4 hover:shadow-md transition duration-200">
                    <CardContent className="flex items-center space-x-4 p-0">
                        <Avatar>
                            <AvatarImage src={user.image || ''} />
                            <AvatarFallback>LD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
