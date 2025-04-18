import "./globals.css";

// export const metadata = {
//   title: "Controle Financeiro",
//   description: "Gerencie suas finanças de forma simples e eficiente",
// };

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
