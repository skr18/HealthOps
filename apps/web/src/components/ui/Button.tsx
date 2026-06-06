export default function Button({ children, ...props }: any) {
  return (
    <button
      style={{
        padding: "10px 16px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </button>
  );
}