import clsx from "clsx";

function Button({ text, onClick, disabled, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "shadow-[0_4px_12px_0px_rgba(0,0,0,0.16)] w-fit flex justify-center rounded-[8px] px-[18px] py-[13px] text-[17px] font-[500] leading-[22px] text-white transition duration-500 bg-[#F5961C] hover:bg-[#F7AB49]",
        disabled && "!bg-[#8d8d8d]",
        !disabled && "cursor-pointer",
        className
      )}
    >
      {text}
    </button>
  );
}

export default Button;
