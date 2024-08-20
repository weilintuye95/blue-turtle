import React from "react";

type QueryTextBoxProps = {
  text: string;
};

const QueryTextBox: React.FC<QueryTextBoxProps> = ({ text }) => {
  return (
    <div className="max-w-[75%] self-end rounded-lg bg-muted px-4 py-2 text-muted-foreground">
      <div className="flex items-center space-x-2">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default QueryTextBox;
