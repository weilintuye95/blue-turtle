import React from "react";

type QueryTextBoxProps = {
  text: string;
};

const QueryTextBox: React.FC<QueryTextBoxProps> = ({ text }) => {
  return (
    <div className="bg-muted text-muted-foreground max-w-[75%] self-end rounded-lg px-4 py-2">
      <div className="flex items-center space-x-2">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default QueryTextBox;
