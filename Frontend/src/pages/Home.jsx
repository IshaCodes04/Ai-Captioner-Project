import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Upload,
  Copy,
  Sparkles,
  Moon,
  Sun,
  Github,
  FileText,
  LogOut,
  Download,
  RefreshCw,
  History,
  Zap,
} from "lucide-react";

const Home = ({ isDarkMode, setIsDarkMode, onLogout, user }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [caption, setCaption] = useState("");
  const [captionStyle, setCaptionStyle] = useState("casual");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [captionHistory, setCaptionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [Error, setError] = useState("");
  const fileInputRef = useRef(null);

  const captionStyles = [
    { id: "casual", label: "Casual 😎", icon: "😎" },
    { id: "funny", label: "Funny 😂", icon: "😂" },
    { id: "professional", label: "Professional 💼", icon: "💼" },
    { id: "poetic", label: "Poetic 🎭", icon: "🎭" },
    { id: "hashtags", label: "With Hashtags #️⃣", icon: "#️⃣" },
  ];

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer && event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      showToastMessage("Please upload a valid image file");
      return;
    }

    try {
      setIsGenerating(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      // Get image URL from backend response
      const imageUrl = res.data?.post?.image || "";
      setUploadedImage(imageUrl);
      
      // Get generated caption from backend
      const generatedCaption = res.data?.post?.caption || "";
      setCaption(generatedCaption);
      
      setIsGenerating(false);
      showToastMessage("Post created successfully! ✨");

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        caption: generatedCaption,
        style: "auto-generated",
        timestamp: new Date().toLocaleTimeString(),
      };

      setCaptionHistory((prevHistory) => [
        newHistoryItem,
        ...prevHistory.slice(0, 4),
      ]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create post. Please try again.");
      showToastMessage("Upload failed ❌");
      setIsGenerating(false);
    }
  };

  const generateCaption = () => {
    setIsGenerating(true);
    setCaption("");

    // Simulate AI processing
    setTimeout(() => {
      const sampleCaptions = {
        casual:
          "Just captured this amazing moment! ✨ Life is beautiful when you take time to notice the little things.",
        funny:
          "When you accidentally take the perfect photo and pretend it was totally planned 😅📸",
        professional:
          "Exploring new perspectives through visual storytelling. Every image tells a unique story worth sharing.",
        poetic:
          "In this fleeting moment, time stands still, and beauty whispers secrets only the heart can hear. 🌟",
        hashtags:
          "Living my best life! ✨ #photography #moments #beautiful #inspiration #blessed #goodvibes #memories",
      };

      const generatedCaption = sampleCaptions[captionStyle];
      setCaption(generatedCaption);
      setIsGenerating(false);

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        caption: generatedCaption,
        style: captionStyle,
        timestamp: new Date().toLocaleTimeString(),
      };

      setCaptionHistory((prevHistory) => [
        newHistoryItem,
        ...prevHistory.slice(0, 4),
      ]);
    }, 2000);
  };

  const copyCaption = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(caption);
        showToastMessage("Caption copied to clipboard! 🎉");
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = caption;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          showToastMessage("Caption copied to clipboard! 🎉");
        } else {
          showToastMessage("Failed to copy caption");
        }
      }
    } catch {
      showToastMessage("Failed to copy caption");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target && event.target.files && event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeImage = (event) => {
    event.stopPropagation();
    setUploadedImage(null);
    setCaption("");
  };

  const findCaptionStyleLabel = (styleId) => {
    const style = captionStyles.find((s) => s.id === styleId);
    return style ? style.label : styleId;
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
      }`}
    >
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            } border border-purple-200`}
          >
            {toastMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <nav
        className={`sticky top-0 z-40 backdrop-blur-md ${
          isDarkMode ? "bg-gray-900/80" : "bg-white/80"
        } border-b ${isDarkMode ? "border-gray-700" : "border-purple-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🖼️</span>
              <span
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                AI Captioner
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Welcome, <span className="font-semibold">{user?.username}</span>!
              </span>
              <button
                className={`p-2 rounded-lg transition-all hover:scale-105 ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-purple-100 text-gray-600"
                }`}
              >
                <FileText className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-lg transition-all hover:scale-105 ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-purple-100 text-gray-600"
                }`}
              >
                <Github className="w-5 h-5" />
              </button>
              <button
                onClick={onLogout}
                className={`p-2 rounded-lg transition-all hover:scale-105 flex items-center space-x-1 ${
                  isDarkMode
                    ? "hover:bg-red-900/30 text-red-400"
                    : "hover:bg-red-100 text-red-600"
                }`}
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all hover:scale-105 ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-yellow-400"
                    : "hover:bg-purple-100 text-purple-600"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div
              className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-600"
                  : "bg-white/50 border-purple-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Upload Your Image ✨
              </h2>

              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  dragOver
                    ? isDarkMode
                      ? "border-purple-400 bg-purple-400/10"
                      : "border-purple-500 bg-purple-50"
                    : isDarkMode
                    ? "border-gray-600 hover:border-purple-400"
                    : "border-purple-300 hover:border-purple-500"
                } ${dragOver ? "scale-105" : "hover:scale-102"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="max-w-full h-64 object-contain mx-auto rounded-lg shadow-lg transition-all duration-500"
                    />
                    <button
                      onClick={removeImage}
                      className={`px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                        isDarkMode
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload
                      className={`w-16 h-16 mx-auto ${
                        isDarkMode ? "text-gray-400" : "text-purple-400"
                      } ${dragOver ? "animate-bounce" : ""}`}
                    />
                    <div>
                      <p
                        className={`text-lg font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {dragOver
                          ? "Drop it here 🚀"
                          : "Drag & drop your image"}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        or click to choose a file
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {uploadedImage && (
                <div className="mt-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Caption Style
                  </label>
                  <select
                    value={captionStyle}
                    onChange={(e) => setCaptionStyle(e.target.value)}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-purple-300 text-gray-800"
                    }`}
                  >
                    {captionStyles.map((style) => (
                      <option key={style.id} value={style.id}>
                        {style.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* History Panel */}
            {captionHistory.length > 0 && (
              <div
                className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-600"
                    : "bg-white/50 border-purple-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-bold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    <History className="w-5 h-5 inline mr-2" />
                    Recent Captions
                  </h3>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={`p-1 rounded transition-all hover:scale-105 ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-purple-100 text-gray-600"
                    }`}
                  >
                    {showHistory ? "−" : "+"}
                  </button>
                </div>

                {showHistory && (
                  <div className="space-y-2 transition-all duration-300">
                    {captionHistory.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all hover:scale-102 ${
                          isDarkMode
                            ? "bg-gray-700/50 hover:bg-gray-700"
                            : "bg-purple-50 hover:bg-purple-100"
                        }`}
                        onClick={() => setCaption(item.caption)}
                      >
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {item.caption.slice(0, 60)}...
                        </p>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          {item.timestamp} • {findCaptionStyleLabel(item.style)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Caption Output Section */}
          <div className="space-y-6">
            <div
              className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-600"
                  : "bg-white/50 border-purple-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Generated Caption 🚀
              </h2>

              {isGenerating ? (
                <div className="text-center py-12 transition-all duration-500">
                  <div className="relative">
                    <Sparkles
                      className={`w-16 h-16 mx-auto animate-spin ${
                        isDarkMode ? "text-purple-400" : "text-purple-500"
                      }`}
                    />
                    <div className="absolute inset-0 w-16 h-16 mx-auto animate-ping">
                      <Sparkles
                        className={`w-16 h-16 ${
                          isDarkMode
                            ? "text-purple-400/30"
                            : "text-purple-500/30"
                        }`}
                      />
                    </div>
                  </div>
                  <p
                    className={`mt-4 text-lg animate-pulse ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Thinking... creating your perfect caption ✨
                  </p>
                  <div className="flex justify-center mt-2 space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full animate-bounce ${
                        isDarkMode ? "bg-purple-400" : "bg-purple-500"
                      }`}
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className={`w-2 h-2 rounded-full animate-bounce ${
                        isDarkMode ? "bg-purple-400" : "bg-purple-500"
                      }`}
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className={`w-2 h-2 rounded-full animate-bounce ${
                        isDarkMode ? "bg-purple-400" : "bg-purple-500"
                      }`}
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              ) : caption ? (
                <div className="space-y-4 transition-all duration-500">
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-purple-50"
                    }`}
                  >
                    <p
                      className={`text-lg leading-relaxed ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {caption}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={copyCaption}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Caption</span>
                    </button>

                    <button
                      onClick={generateCaption}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-white hover:bg-gray-50 text-gray-800 border border-purple-200"
                      }`}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Generate New</span>
                    </button>

                    <button
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-white hover:bg-gray-50 text-gray-800 border border-purple-200"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Zap
                    className={`w-16 h-16 mx-auto mb-4 ${
                      isDarkMode ? "text-gray-600" : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`text-lg ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Upload an image to generate a caption
                  </p>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div
              className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-600"
                  : "bg-white/50 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                💡 Quick Tips
              </h3>
              <ul
                className={`space-y-2 text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li>• Upload clear, high-quality images for better captions</li>
                <li>• AI generates captions based on image content</li>
                <li>• Use the history panel to revisit previous captions</li>
                <li>• Generated captions are perfect for social media posts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`mt-16 ${
          isDarkMode ? "bg-gray-900/50" : "bg-white/50"
        } backdrop-blur-md border-t ${
          isDarkMode ? "border-gray-700" : "border-purple-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Made with 💻✨ by{" "}
              <span className="font-semibold text-purple-500">Isha</span> |
              Powered by AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
