import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup } from '@base-ui-components/react/toggle-group';

type ToggleOption<T> = {
  label: string;
  value: T;
  ariaLabel?: string;
};

type ToggleSelectorProps<T extends string> = {
  value: T;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
  className?: string;
};

export function ToggleSelector<T extends string>({
  value,
  options,
  onChange,
  className,
}: ToggleSelectorProps<T>) {
  return (
    <ToggleGroup className={`flex gap-px rounded-md border p-0.5 hover:cursor-pointer ${className ?? ''}`}>
      {options.map((opt) => (
        <Toggle
          key={opt.value}
          aria-label={opt.ariaLabel ?? opt.label}
          pressed={value === opt.value}
          onPressedChange={(pressed) => {
            if (pressed) onChange(opt.value);
          }}
          className={`flex size-20 items-center justify-center rounded-sm text-gray-600 ${
            value === opt.value ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          {opt.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
