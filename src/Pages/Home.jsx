import React from "react";
import { Stack } from "@mui/material";
import InitialChatCard from "../Components/InitialChatCard.jsx";
import ChatInput from "../Components/ChatInput.jsx";
import ChattingCard from "../Components/ChattingCard.jsx";
import FeedbackModal from "../Components/FeedbackModal.jsx";
import { useEffect, useRef, useState, useContext } from "react";
import data from "../Data/sampleData.json";
import { useOutletContext } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import { ThemeContext } from "../Theming/ThemeContext";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const listRef = useRef(null);
  const [chatId, setChatId] = useState(1);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const context = useOutletContext();
  const { chat = [], setChat } = context || {};
  const { mode } = useContext(ThemeContext);

  const generateAIResponse = (input) => {
    const response = data.find(
      (item) => input.toLowerCase() == item.question.toLowerCase()
    );
    let answer = "As an AI Language Model, I don’t have the details";
    if (response != undefined) {
      answer = response.response;
    }
    setChat((prev) => [
      ...prev,
      {
        type: "Human",
        text: input,
        time: new Date(),
        id: chatId,
      },
      {
        type: "AI",
        text: answer,
        time: new Date(),
        id: chatId + 1,
      },
    ]);

    setChatId((prev) => prev + 2);
  };
  //AUTOSCROLL TO LAST ELEMENT
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [scrollToBottom]);

  return (
    <Stack
      height={"100vh"}
      justifyContent={"space-between"}
      sx={{
        "@media (max-width:767px)": {
          background:
            mode == "light" ? "linear-gradient(#F9FAFA 60%, #EDE4FF)" : "",
        },
      }}
    >
      <Navbar />

      {chat.length == 0 && (
        <InitialChatCard generateAIResponse={generateAIResponse} />
      )}

      {chat.length > 0 && (
        <Stack
          height={1}
          flexGrow={0}
          p={{ xs: 2, md: 3 }}
          spacing={{ xs: 2, md: 3 }}
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(151, 133, 186,0.4)",
              borderRadius: "8px",
            },
          }}
          ref={listRef}
        >
          {chat.map((item, index) => (
            <ChattingCard
              details={item}
              key={index}
              updateChat={setChat}
              setSelectedChatId={setSelectedChatId}
              showFeedbackModal={() => setShowModal(true)}
            />
          ))}
        </Stack>
      )}

      <ChatInput
        generateAIResponse={generateAIResponse}
        setScroll={setScrollToBottom}
        chat={chat}
        clearChat={() => setChat([])}
      />

      <FeedbackModal
        open={showModal}
        updateChat={setChat}
        chatId={selectedChatId}
        handleClose={() => setShowModal(false)}
      />
    </Stack>
  );
};

export default Home;
