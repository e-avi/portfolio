type FunOSProps = {
  navigateHome: () => void;
};

export function FunOS({ navigateHome }: FunOSProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--quick-silver)",
        padding: "2rem",
      }}
    />
  );
}