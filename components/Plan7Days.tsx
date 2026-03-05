'use client';

import { useState } from 'react';
import { PlanDay } from '@/lib/types';

export default function Plan7Days({ plan }: { plan: PlanDay[] }) {
  const [openDay, setOpenDay] = useState<number>(1);

  return (
    <div className="space-y-3">
      {plan.map((item) => (
        <div key={item.day} className="rounded-lg border bg-white p-4">
          <button className="w-full text-left" type="button" onClick={() => setOpenDay(openDay === item.day ? -1 : item.day)}>
            <p className="font-semibold">Day {item.day}: {item.focus}</p>
          </button>
          {openDay === item.day && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {item.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
