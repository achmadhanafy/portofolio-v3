import React from "react";

function Title({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  return <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-16">{children}</h2>;
}

export default Title;
