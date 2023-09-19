export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const centeringStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // This centers vertically as well
  };

  return <div style={centeringStyles}>{children}</div>;
}
