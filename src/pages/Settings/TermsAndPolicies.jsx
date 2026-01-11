import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
  useUpdatePrivacyPolicyMutation,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/api/authApi";

export default function TermsAndPolicies() {
  const [activeTab, setActiveTab] = useState("terms");
  const [isEditing, setIsEditing] = useState(false);

  // Queries
  const {
    data: termsData,
    isLoading: isTermsLoading,
    isError: isTermsError,
  } = useGetTermsAndConditionsQuery();
  const {
    data: privacyData,
    isLoading: isPrivacyLoading,
    isError: isPrivacyError,
  } = useGetPrivacyPolicyQuery();

  // Mutations
  const [updateTerms, { isLoading: isUpdatingTerms }] =
    useUpdateTermsAndConditionsMutation();
  const [updatePrivacy, { isLoading: isUpdatingPrivacy }] =
    useUpdatePrivacyPolicyMutation();

  const [editContent, setEditContent] = useState("");
  const editorRef = useRef(null);

  // Sync editContent with activeTab data
  useEffect(() => {
    if (activeTab === "terms" && termsData) {
      setEditContent(termsData.content);
    } else if (activeTab === "privacy" && privacyData) {
      setEditContent(privacyData.content);
    }
  }, [activeTab, termsData, privacyData]);

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

  const handleSaveEdit = async () => {
    const html = editorRef.current?.innerHTML ?? editContent;
    const cleanHtml = html.replace(/<br>/g, "\n");

    try {
      if (activeTab === "terms") {
        await updateTerms({ content: cleanHtml }).unwrap();
      } else {
        await updatePrivacy({ content: cleanHtml }).unwrap();
      }
      toast.success(
        `${
          activeTab === "terms" ? "Terms & Conditions" : "Privacy Policy"
        } updated successfully`
      );
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update content");
      console.error("Update error:", error);
    }
  };

  const handleCancelEdit = () => {
    if (activeTab === "terms") {
      setEditContent(termsData?.content || "");
    } else {
      setEditContent(privacyData?.content || "");
    }
    setIsEditing(false);
  };

  const [fontSize, setFontSize] = useState("12");

  const applyFormat = (command, value) => {
    if (editorRef.current && isEditing) {
      document.execCommand(command, false, value);
      editorRef.current.focus();
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = e.target.value;
    setFontSize(newSize);
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

  const isLoading = activeTab === "terms" ? isTermsLoading : isPrivacyLoading;
  const isError = activeTab === "terms" ? isTermsError : isPrivacyError;
  const currentContent = activeTab === "terms" ? termsData : privacyData;
  const isUpdating = isUpdatingTerms || isUpdatingPrivacy;

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
              className="px-4 py-2 bg-[#FFBA07] text-white font-semibold rounded hover:bg-amber-500 transition-colors disabled:opacity-50"
              disabled={isLoading || isError}
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
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFBA07]"></div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center min-h-[400px] text-red-500">
            Failed to load content. Please try again later.
          </div>
        ) : isEditing ? (
          <>
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-[400px] p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 text-gray-800 leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{
                __html: (editContent || "").replace(/\n/g, "<br>"),
              }}
              onBlur={(e) =>
                setEditContent(e.currentTarget.innerHTML.replace(/<br>/g, "\n"))
              }
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSaveEdit}
                disabled={isUpdating}
                className="px-6 py-2 bg-[#FFBA07] text-white font-semibold rounded hover:bg-amber-500 transition-colors disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className="px-6 py-2 bg-gray-200 text-gray-900 font-semibold rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="prose prose-sm max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: currentContent?.content || "",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
