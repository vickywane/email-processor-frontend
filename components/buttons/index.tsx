interface ButtonProps {
  clickAction?: () => void;
  text: string;
  disabled?: boolean;
  icon?: any;
}

const Button = ({ clickAction, disabled, text, icon }: ButtonProps) => {
  return (
    <button
      onClick={clickAction}
      disabled={!clickAction || disabled}
      className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
    >
      {icon && icon}

      <div className="ml-2 mt-1" >{text}</div>
    </button>
  );
};

export default Button;
