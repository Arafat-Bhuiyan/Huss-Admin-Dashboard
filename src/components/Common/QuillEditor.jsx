import React from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Register fonts and sizes to use inline styles instead of classes
// This ensures that formatting like font-size and alignment works in the user panel 
// even if they don't have the Quill CSS specifically for those classes.
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["small", "medium", "large", "huge"];
Quill.register(Size, true);

const Align = Quill.import("attributors/style/align");
Quill.register(Align, true);

const QuillEditor = ({
  value,
  onChange,
  placeholder = "Write something amazing...",
  className = "",
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }], // Font size
      ["bold", "italic", "underline", "strike"], // Toggles
      [{ color: [] }, { background: [] }], // Color and background
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }], // Text align
      ["link", "clean"], // Removed images as requested
    ],
  };

  

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
  ];

  return (
    <div className={`quill-editor-wrapper ${className}`}>
      <style>{`
        .quill-editor-wrapper .ql-toolbar {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          border-color: #e4e4e7;
          background: #fafafa;
        }
        .quill-editor-wrapper .ql-container {
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          border-color: #e4e4e7;
          min-height: 150px;
          font-family: inherit;
          font-size: 14px;
        }
        .quill-editor-wrapper .ql-editor {
          min-height: 150px;
        }
        .quill-editor-wrapper .ql-editor.ql-blank::before {
          color: #a1a1aa;
          font-style: normal;
        }
        .quill-editor-wrapper .ql-snow .ql-stroke {
          stroke: #71717a;
        }
        .quill-editor-wrapper .ql-snow .ql-fill {
          fill: #71717a;
        }
        .quill-editor-wrapper .ql-snow.ql-toolbar button:hover .ql-stroke,
        .quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: #0d9488;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default QuillEditor;
