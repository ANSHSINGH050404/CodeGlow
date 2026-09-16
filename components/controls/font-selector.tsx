"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { FONTS } from "@/lib/fonts";

export function FontSelector() {
  const { font, setFont } = useCodeGlowStore();

  return (
    <Select value={font} onValueChange={setFont}>
      <SelectTrigger
        aria-label="Font"
        title="Font"
        className="h-9 w-full text-xs"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {FONTS.map((f) => (
          <SelectItem key={f.id} value={f.id} className="text-xs">
            {f.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
