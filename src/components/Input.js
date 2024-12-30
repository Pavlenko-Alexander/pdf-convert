import clsx from "clsx";

function Input({ value, onChange, placeholder, className }) {
  return (
    <textarea
      onChange={onChange}
      value={value}
      className={clsx(
        "custom-scrollbar border rounded-xl bg-transparent w-[600px] h-40 p-3",
        className
      )}
      placeholder={placeholder || ""}
    />
  );
}

export default Input;
