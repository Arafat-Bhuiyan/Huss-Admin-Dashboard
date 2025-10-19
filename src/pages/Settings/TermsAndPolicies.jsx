import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TermsAndPolicies() {
  const [activeTab, setActiveTab] = useState("terms");
  const [isEditing, setIsEditing] = useState(false);

  const [content, setContent] = useState({
    terms: `<ul>
<li>Lorem ipsum dolor sit amet consectetur. Lacus at venenatis gravida vivamus mauris. Quisque mi est vel dis. Donec rhoncus laoreet odio orci sed risus elit accumsan. Mattis ut est tristique amet vitae at aliquet. Ac vel porttitor egestas scelerisque enim quisque senectus. Euismod ultricies vulputate id cras bibendum sollicitudin proin odio bibendum. Velit velit in scelerisque erat etiam rutrum phasellus nunc. Sed lectus sed a at eget. Nunc purus sed quis at risus. Consectetur nibh justo proin placerat condimentum id at adipiscing.</li>
<li>Vel blandit mi nulla sodales consectetur. Egestas tristique ultrices gravida duis nisl odio. Posuere curabitur eu platea pellentesque ut. Facilisi elementum neque mauris facilisis in. Cursus condimentum ipsum pretium consequat turpis at porttitor nisl.</li>
<li>Scelerisque tellus praesent condimentum euismod a faucibus. Auctor at ultricies at urna aliquam massa pellentesque. Vitae vulputate nulla diam placerat m.</li>
</ul>`,
    privacy: `<ul>
<li><strong>Privacy policy</strong> content goes here. This section contains important information about how we handle your data and privacy.</li>
<li>We are committed to protecting your personal information and respecting your privacy.</li>
<li>All data is handled in accordance with applicable laws and regulations.</li>
</ul>`,
  });

  const [editContent, setEditContent] = useState(content[activeTab]);
  const editorRef = useRef(null);

  useEffect(() => {
    setEditContent(content[activeTab]);
  }, [activeTab, content]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain") ?? "";
      document.execCommand("insertText", false, text);
    };
    el.addEventListener("paste", handlePaste);
    return () => el.removeEventListener("paste", handlePaste);
  }, [isEditing]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    const html = editorRef.current?.innerHTML ?? editContent;
    setContent((prev) => ({ ...prev, [activeTab]: html }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(content[activeTab]);
    setIsEditing(false);
  };

  const [fontSize, setFontSize] = useState("12");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const applyFormat = (command, value) => {
    if (editorRef.current && isEditing) {
      document.execCommand(command, false, value);
      editorRef.current.focus();
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = e.target.value;
    setFontSize(newSize);
    // Apply the new font size to the selected text only
    applyFontSizeToSelection(newSize);
  };

  const applyFontSizeToSelection = (size) => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    if (range) {
      const span = document.createElement("span");
      span.style.fontSize = `${size}px`;
      range.surroundContents(span);
    }
  };

  return (
    <div className="min-h-screen py-6">
      <div className="py-8">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => handleTabChange("terms")}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === "terms"
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => handleTabChange("privacy")}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === "privacy"
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Privacy Policy
            </button>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#FFBA07] text-white font-semibold rounded hover:bg-amber-500 transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        {/* Toolbar */}
        {isEditing && (
          <div className="flex items-center space-x-2 mb-4 p-2 border border-gray-300 rounded bg-gray-50">
            <select
              value={fontSize}
              onChange={handleFontSizeChange}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="24">24</option>
            </select>

            <div className="w-px h-6 bg-gray-300" />

            <button
              onClick={() => applyFormat("bold")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Bold"
            >
              <Bold size={16} />
            </button>

            <button
              onClick={() => applyFormat("italic")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Italic"
            >
              <Italic size={16} />
            </button>

            <button
              onClick={() => applyFormat("underline")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Underline"
            >
              <Underline size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300" />

            <button
              onClick={() => applyFormat("justifyLeft")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Left"
            >
              <AlignLeft size={16} />
            </button>

            <button
              onClick={() => applyFormat("justifyCenter")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Center"
            >
              <AlignCenter size={16} />
            </button>

            <button
              onClick={() => applyFormat("justifyRight")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Right"
            >
              <AlignRight size={16} />
            </button>
          </div>
        )}

        {/* Content */}
        {isEditing ? (
          <>
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-[400px] p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 text-gray-800 leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{
                __html: (editContent ?? content[activeTab] ?? "").replace(
                  /\n/g,
                  "<br>"
                ),
              }}
              onBlur={(e) =>
                setEditContent(e.currentTarget.innerHTML.replace(/<br>/g, "\n"))
              }
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-[#FFBA07] text-white font-semibold rounded hover:bg-amber-500 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-gray-200 text-gray-900 font-semibold rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="prose prose-sm max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content[activeTab] }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
