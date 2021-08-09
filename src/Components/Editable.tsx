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
    if (type === "input" && keys.indexOf(key) > -1 && event.target.value!=="") {
      setEditing(false);
      handleKeyDown(event);
    }
  };

  function handleFocus(e: any) {
    if (e.type === "blur") {
      setEditing(false);
    }else if(e.type === "focus"){
      window.scrollTo(0, 240);
    }
  }

  return (
    <section {...props}>
      {isEditing ? (
        <div>
          <input
            required
            minLength={1} 
            maxLength={32}
            ref={childRef}
            className="sm:h-6 w-10/12 md:h-8 shadow appearance-none border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:shadow-outline text-gray-700 text-center leading-tight"
            type="text"
            name="task"
            placeholder={placeholder}
            value={text}
            onInput={handleOnInput}
            onKeyDown={(e: any) => HandleKeyDown(e, type)}
            onFocus={handleFocus}
            onBlur={handleFocus}
          />
        </div>
      ) : (
        <div
          id="editableLabel"
          className={`leading-tight overflow-ellipsis overflow-hidden whitespace-pre-wrap editable-${type}`}
          onClick={() => setEditing(true)}
        >
          <span>
            {text}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;