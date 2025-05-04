
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProposalFiltersProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export const ProposalFilters = ({ 
  filterStatus, 
  setFilterStatus 
}: ProposalFiltersProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Select
        value={filterStatus}
        onValueChange={setFilterStatus}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
