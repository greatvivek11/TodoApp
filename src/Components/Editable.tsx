import { h } from 'preact';
import { useState, useEffect } from "preact/hooks";

const Editable = ({ text, type, placeholder, children, childRef, handleOnInput, handleKeyDown, ...props }: any) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  function HandleKeyDown(event: any, type: any): void {
    const { key } = event;
    const keys = ["Escape", "Tab", "Enter"];
    if (
      (type === "input" && keys.indexOf(key) > -1)
    ) {
      setEditing(false);
      handleKeyDown(event);
    }
  };

  function handleFocus(e: any) {
    if (e.type === "blur") {
      setEditing(false);
    }
  }

  return (
    <section {...props}>
      {isEditing ? (
        <div className="hover:borderColor-green-500">
          <input
            ref={childRef}
            className="shadow appearance-none border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:shadow-outline text-gray-700 text-center leading-tight"
            type="text"
            name="task"
            placeholder="Write a task"
            value={text}
            onInput={handleOnInput}
            onKeyDown={(e: any) => HandleKeyDown(e, type)}
            onBlur={handleFocus}
          />
        </div>
      ) : (
        <div
          id="editableLabel"
          className={`rounded-md leading-tight whitespace-pre-wrap editable-${type}`}
          onClick={() => setEditing(true)}
        >
          <span>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;