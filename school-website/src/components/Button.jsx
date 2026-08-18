import clsx from "clsx";

const Button = ({ 
  id, 
  title, 
  rightIcon, 
  leftIcon, 
  containerClass, 
  onClick 
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={clsx(
        "group relative z-10 cursor-pointer overflow-hidden",
        containerClass
      )}
    >
      {leftIcon}
      
      <span className="relative inline-flex">
        {title}
      </span>

      {rightIcon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;