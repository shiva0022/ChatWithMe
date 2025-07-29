'use client';
import React, { useState } from "react";
import Welcome from "./Welcome";
import Responses from "./Responses";

const ChatResponse: React.FC = () => {
  const [responses, setResponses] = useState<any[]>([]);

  return (
    <div className="h-full w-full">
      {responses.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <Welcome />
        </div>
      ) : (
        <Responses />
      )}
    </div>
  );
};

export default ChatResponse;
