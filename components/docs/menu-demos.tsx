'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Live demo for checkbox rows: they're controlled, so the docs need a little state.
const STATUSES = ['Running', 'Waiting for approval', 'Finished'] as const;

export function MultiSelectMenuDemo() {
  const [shown, setShown] = useState<string[]>(['Running']);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Show</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Task status</DropdownMenuLabel>
        {STATUSES.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={shown.includes(status)}
            onCheckedChange={(on) => setShown(on ? [...shown, status] : shown.filter((s) => s !== status))}
            onSelect={(e) => e.preventDefault()}
          >
            {status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
