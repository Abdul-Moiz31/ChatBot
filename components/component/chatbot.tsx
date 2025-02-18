"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { SendIcon, SquareIcon } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faMedium,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faUserPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chat",
    });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-[672px] mx-auto bg-background rounded-lg shadow-lg">
      <Navbar toggleModal={toggleModal} />
      <div className="flex-1 overflow-auto p-6">
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <Image src="/ai.png" alt="AI" width={80} height={80} />
            <p className="text-lg text-muted-foreground mt-4">
              Welcome to the Chatbot! Ask me anything.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {messages.map((message) =>
            message.role === "assistant" ? (
              <div key={message.id} className="flex items-start gap-3">
                <div className="p-2 border border-gray-700 rounded-full">
                  <Image src="/ai.png" alt="AI" width={20} height={20} />
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                  <Markdown className="text-sm text-muted-foreground">
                    {message.content}
                  </Markdown>
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex justify-end">
                <div className="bg-primary rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm text-primary-foreground">
                    {message.content}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-muted/50 px-4 py-3 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg pr-12 min-h-[64px]"
            rows={1}
            value={input}
            onChange={handleInputChange}
          />

          {!isLoading ? (
            <Button
              type="submit"
              size="icon"
              disabled={!input || isLoading}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              disabled={!isLoading}
              onClick={stop}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <SquareIcon className="w-5 h-5" fill="white" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-[90%] w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <div className="flex justify-around items-center gap-4">
              <a
                href="https://www.linkedin.com/in/im-abdulmoiz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a
                href="https://medium.com/@iam-abdulmoiz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faMedium} size="2x" />
              </a>
              <a
                href="https://github.com/Abdul-Moiz31"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
              <a
                href="mailto:abdulmoiz3140@gmail.com"
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </a>
            </div>
            <Button
              onClick={toggleModal}
              className="mt-6 bg-primary text-primary-foreground w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar({ toggleModal }: { toggleModal: () => void }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground shadow-lg rounded-t-lg">
      <div className="text-xl font-bold">ChatBot</div>
      <div className="flex items-center gap-6">
        <button
          onClick={toggleModal}
          className="text-base hover:underline"
        >
          Contact Us
        </button>
        <a href="#" className="text-base hover:underline">
          <FontAwesomeIcon icon={faUserPlus} size="lg" title="Sign Up" />
        </a>
        <Button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
          <FontAwesomeIcon icon={faSignInAlt} size="lg" title="Sign In" />
        </Button>
      </div>
    </nav>
  );
}
