import { getInputProps } from "@conform-to/react";
import { cn } from "~/lib/utils";

export default function Input({
  field,
  label,
  placeholder,
  hint,
  inputType = "text",
  className,
}: {
  field: any;
  label?: string;
  placeholder?: string;
  hint?: string;
  inputType?: "number" | "text" | "email" | "password" | "textarea";
  className?: string;
}) {
  return (
    <div>
      {label && <label htmlFor={field.name}>{label ?? field.name}</label>}
      {inputType === "textarea" ? (
        <textarea
          {...getInputProps(field, { type: "textarea" })}
          className={cn(
            className,
            "w-full",
            field?.errors && "!border-red-300/50"
          )}
          placeholder={placeholder}
        />
      ) : (
        <input
          {...getInputProps(field, { type: inputType })}
          className={cn(
            className,
            "w-full",
            field?.errors && "!border-red-300/50"
          )}
          placeholder={placeholder}
        />
      )}
      {hint && (
        <small id="displayname" className="px-2 pt-0.5 text-xs">
          ⓘ&nbsp;{hint}
        </small>
      )}
      {field?.errors?.map((_err) => (
        <p key={_err} className="px-2 text-red-400 text-xs">
          ❗ {_err}
        </p>
      ))}
    </div>
  );
}
