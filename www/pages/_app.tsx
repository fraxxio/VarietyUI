import { MDXProvider } from "nextra/mdx";
import "../components/globals.css";
import Button from "@/components/ui/Button";
import PreviewComponent from "@/components/PreviewComponent";

const components = {
  button: Button,
  centerComponent: PreviewComponent,
};

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
