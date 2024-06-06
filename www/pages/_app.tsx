import { MDXProvider } from "nextra/mdx";
import "../components/globals.css";
import Button from "@/components/ui/Button";
import CenterComponent from "@/components/CenterComponent";

const components = {
  button: Button,
  centerComponent: CenterComponent,
};

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
