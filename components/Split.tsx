import { Fragment } from "react";

type SplitProps = {
  text: string;
  by?: "chars" | "words";
  mask?: boolean;
  className?: string;
};

// Divide el texto en palabras o letras (.split-item) para animarlas con GSAP.
// El lector de pantalla recibe la frase completa; los fragmentos van ocultos.
export default function Split({ text, by = "words", mask = true, className = "" }: SplitProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className={mask ? "split-mask" : "inline-block"}>
              {by === "chars" ? (
                [...word].map((char, j) => (
                  <span key={j} className="split-item">
                    {char}
                  </span>
                ))
              ) : (
                <span className="split-item">{word}</span>
              )}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
