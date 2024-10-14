import { Head, Html, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
  useEffect(() => {
    document.body.style.backgroundColor = "#000";  // Mengganti dengan warna latar belakang gelap
    document.body.style.color = "#fff";            // Mengatur warna teks
  }, []);

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
