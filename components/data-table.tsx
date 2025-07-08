import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DataTableSkeleton from "./DataTableSkelton"
import { CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAdminPayments } from "@/hooks/use-admin"

export default function DataTable() {
  const { payments, loading, error } = useAdminPayments()

  if (loading) return <DataTableSkeleton/>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Payment History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Resume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.userId.slice(0, 6)}...</TableCell>
              <TableCell>{payment.user?.email}</TableCell>
              <TableCell>
                <Badge className="text-white text-sm lowercase" variant={"default"}>
                  {payment.paymentType.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                {payment.status === "COMPLETED" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Badge
                    variant="outline"
                    className={`capitalize text-xs ${
                      payment.status === "PENDING"
                        ? "text-yellow-600 border-yellow-500"
                        : "text-red-600 border-red-500"
                    }`}
                  >
                    {payment.status.toLowerCase()}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <code>{payment.resumeId?.slice(0, 8)}...</code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
