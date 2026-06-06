export default function Input(props: any) {
  return (
    <input
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        width: "100%",
      }}
      {...props}
    />
  );
}