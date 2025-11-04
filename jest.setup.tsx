import React from "react";
import "@testing-library/jest-dom";

// Mock react-markdown
jest.mock("react-markdown", () => {
  const MockReactMarkdown = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  MockReactMarkdown.displayName = "ReactMarkdown";
  return MockReactMarkdown;
});

// Mock remark-gfm
jest.mock("remark-gfm", () => () => ({}));

// Mock scrollIntoView for jsdom
Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  configurable: true,
  value: jest.fn(),
});
