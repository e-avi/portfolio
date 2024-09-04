type MainPortfolioProps = {
  navigateFun: () => void;
};

export function MainPortfolio({ navigateFun }: MainPortfolioProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--isabelline)",
        padding: "2rem",
      }}
    />
  );
}