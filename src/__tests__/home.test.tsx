import HomeSection from "@/components/section/HomeSection";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock useChatbotMutation hook
jest.mock("@/lib/services/chatApi", () => ({
  useChatbotMutation: () => {
    // return a mock function + mock result object
    return [
      jest.fn().mockImplementation(({ message }) => {
        // simulate async success response
        return Promise.resolve({
          data: { response: `Echo: ${message}` },
        });
      }),
      { isLoading: false, isUninitialized: false },
    ];
  },
}));

describe("HomeSection - AI Chatbot", () => {
  test("renders initial AI greeting", () => {
    render(<HomeSection section="ai-chatbot" />);
    expect(
      screen.getByText(/Hello! I'm Hanafy's AI assistant/i)
    ).toBeInTheDocument();
  });

  test("user can type a message and see it appear", async () => {
    render(<HomeSection section="ai-chatbot" />);
    const input = screen.getByPlaceholderText("Ask something...");
    const sendButton = screen.getByTestId("send-chatbot");

    // type and submit
    await userEvent.type(input, "Hello AI!");
    fireEvent.submit(sendButton);

    // user message should appear immediately
    expect(screen.getByText("Hello AI!")).toBeInTheDocument();
  });

  test("AI responds after message sent", async () => {
    render(<HomeSection section="ai-chatbot" />);
    const input = screen.getByPlaceholderText("Ask something...");
    const sendButton = screen.getByTestId("send-chatbot");

    await userEvent.type(input, "What can you do?");
    fireEvent.submit(sendButton);

    // Wait for the AI response
    await waitFor(() => {
      expect(screen.getByText("Echo: What can you do?")).toBeInTheDocument();
    });
  });
});
