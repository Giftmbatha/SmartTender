import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function Filters({ onFilter }) {
  const [province, setProvince] = useState("");
  const [buyer, setBuyer] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState([0, 1000000]);

  const applyFilters = () => {
    onFilter({ province, buyer, deadline, budget });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {/* Province Dropdown */}
      <Select onValueChange={setProvince}>
        <SelectTrigger>
          <SelectValue placeholder="Select Province" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gauteng">Gauteng</SelectItem>
          <SelectItem value="western_cape">Western Cape</SelectItem>
          <SelectItem value="kwazulu_natal">KwaZulu-Natal</SelectItem>
        </SelectContent>
      </Select>

      {/* Buyer Dropdown */}
      <Select onValueChange={setBuyer}>
        <SelectTrigger>
          <SelectValue placeholder="Select Buyer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="government">Government</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>

      {/* Deadline Date Picker */}
      <Input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      {/* Budget Range */}
      <div className="flex flex-col">
        <label className="text-sm">Budget Range</label>
        <Slider
          min={0}
          max={5000000}
          step={10000}
          value={budget}
          onValueChange={setBudget}
        />
        <p className="text-xs mt-1">
          R{budget[0]} - R{budget[1]}
        </p>
      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-2 md:col-span-4"
      >
        Apply Filters
      </button>
    </div>
  );
}
