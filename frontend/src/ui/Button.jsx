import { Link } from "react-router-dom";

// 组件可以接受各种不同的 props，这些 props 可以是用于控制按钮是否禁用、按钮的链接目标等等。通常我们会将内容作为 children 传递给组件
function Button({ children, disabled, to, variation, onClick, type }) {
  const base =
    "inline-block text-sm rounded-full bg-amber-500 font-semibold uppercase tracking-wide text-zinc-800 transition-colors duration-300 hover:bg-amber-400 focus:bg-amber-400 focus:outline-none focus:ring focus:ring-amber-400 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " py-2 px-4 md:px-5 md:py-2.5 text-xs",
    secondary:
      "inline-block text-sm rounded-full border-2 border-zinc-300 font-semibold uppercase tracking-wide text-zinc-600 transition-colors duration-300 hover:bg-zinc-300 hover:text-zinc-800 focus:bg-zinc-300 focus:outline-none focus:text-zinc-800 focus:ring focus:ring-zinc-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    round: base + " py-1 px-2.5 md:px-3.5 md:py-2 text-sm",
  };

  // Button 组件会根据传入的 to 属性的值 (链接的目标地址) 来决定返回一个 <Link> 元素还是一个 <button> 元素。
  if (to)
    return (
      <Link to={to} className={styles[variation]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        className={styles[variation]}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );

  if (type)
    return (
      <button type={type} className={styles[variation]} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={styles[variation]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
