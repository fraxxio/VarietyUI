import { MDXProvider } from "nextra/mdx";
import "../components/globals.css";
import Button from "@/components/ui/Button";
import PreviewComponent from "@/components/PreviewComponent";
import { AppProps } from "next/app";

const components = {
  Button,
  PreviewComponent,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
