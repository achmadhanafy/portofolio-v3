import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChatRequestType, ChatResponseType } from "../../types/chat.type";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // base url for Next.js API routes
  endpoints: (builder) => ({
    chatbot: builder.mutation<ChatResponseType, ChatRequestType>({
      query: (body) => ({
        url: "api/chatbot",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useChatbotMutation } = chatApi;
