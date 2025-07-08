"use client";
import { useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

 

  return (
    <div className="p-4">
    </div>
  );
}
