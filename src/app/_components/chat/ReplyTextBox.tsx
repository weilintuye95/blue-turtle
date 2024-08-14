import React from "react";

type ReplyTextBoxProps = {
  text: string;
};

const ReplyTextBox: React.FC<ReplyTextBoxProps> = ({ text }) => {
  return (
    <div className="bg-primary text-primary-foreground max-w-[75%] rounded-lg px-4 py-2">
      <p>{text}</p>
    </div>
  );
};

export default ReplyTextBox;
