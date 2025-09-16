"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOrders = [
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "lowest" },
  { name: "Price: High to Low", value: "highest" },
  { name: "Avg. Customer review", value: "rating" },
];

export function SortSelect({ initialSort }: { initialSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", value);
    newParams.set("page", "1"); // Reset to first page when sorting
    router.push(`/search?${newParams.toString()}`);
  };

  return (
    <Select value={initialSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOrders.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
