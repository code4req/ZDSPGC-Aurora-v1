const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-yellow-300 px-7 py-3 text-black hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2 ${containerClass || ''}`}
    >
      {leftIcon && <span className="text-lg">{leftIcon}</span>}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon && <span className="text-lg">{rightIcon}</span>}
    </button>
  );
};

export default Button;