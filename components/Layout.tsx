import { ReactNode } from "react";
import Nav from "./Nav";

interface Props {
  withNav?: boolean;
  noPadding?: boolean;
  children: ReactNode;
}

const Layout = ({ children, withNav = false, noPadding }: Props) => (
  <div>
    <div className={`layout ${noPadding ? "no-padding" : ""}`}>
      {withNav && <Nav />}
      {children}
    </div>
    <style jsx global>{`
      /*
      1. Use a more-intuitive box-sizing model.
      */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      /*
      2. Remove default margin
      */
      * {
        margin: 0;
      }
      /*
      Typographic tweaks!
      3. Add accessible line-height
      4. Improve text rendering
      */
      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }
      /*
      5. Improve media defaults
      */
      img,
      picture,
      video,
      canvas,
      svg {
        display: block;
        max-width: 100%;
      }
      /*
      6. Remove built-in form typography styles
      */
      input,
      button,
      textarea,
      select {
        font: inherit;
      }
      /*
      7. Avoid text overflows
      */
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        overflow-wrap: break-word;
      }
      /*
      8. Create a root stacking context
      */
      #root,
      #__next {
        isolation: isolate;
      }
      html {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        max-width: 800px;
        margin: 0 auto;
      }

      .no-padding {
        padding: 0;
      }
    `}</style>
  </div>
);

export default Layout;
