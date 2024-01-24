import "../../globals.css";

export const metadata = {
  title: "Horário | View",
  description: "Table View",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
