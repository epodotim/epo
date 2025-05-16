import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup } from '@base-ui-components/react/toggle-group';
import { useState } from 'react';

type PaidToggleProps = {
  value?: 'free' | 'paid';
  onChange?: (value: 'free' | 'paid') => void;
};

export default function PaidToggle({ value, onChange }: PaidToggleProps) {
  const [selected, setSelected] = useState<'free' | 'paid'>(value ?? 'free');

  const handleSelect = (newValue: 'free' | 'paid') => {
    setSelected(newValue);
    onChange?.(newValue); // 親コンポーネントに通知
  };

  return (
    <ToggleGroup className="flex gap-px rounded-md border border-gray-200 bg-gray-50 p-0.5 hover:cursor-pointer">
      <Toggle
        aria-label="Free plan"
        pressed={selected === 'free'}
        onPressedChange={(pressed) => {
          if (pressed) handleSelect('free');
        }}
        className={`flex size-20 items-center justify-center rounded-sm text-gray-600 ${
          selected === 'free' ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-100'
        }`}
      >
        Free
      </Toggle>
      <Toggle
        aria-label="Paid plan"
        pressed={selected === 'paid'}
        onPressedChange={(pressed) => {
          if (pressed) handleSelect('paid');
        }}
        className={`flex size-20 items-center justify-center rounded-sm text-gray-600 ${
          selected === 'paid' ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-100'
        }`}
      >
        Paid
      </Toggle>
    </ToggleGroup>
  );
}
