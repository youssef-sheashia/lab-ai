let chatHistory = [];
let currentConversation = null;
let isLoading = false;

const historyListEl = document.getElementById("history-list");
const chatMessagesEl = document.getElementById("chat-messages");
const messageInputEl = document.getElementById("message-input");
const sendBtnEl = document.getElementById("send-btn");
const newChatBtnEl = document.getElementById("new-chat-btn");
const statusEl = document.getElementById("status");
const loaderEl = document.getElementById("loader");

function adjustTextareaHeight() {
  messageInputEl.style.height = "auto";
  messageInputEl.style.height = `${Math.min(messageInputEl.scrollHeight, 240)}px`;
}

function loadHistory() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    chatHistory = JSON.parse(stored);
  }
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
}

function createConversation() {
  return {
    id: Date.now().toString(),
    title: "New Chat",
    createdAt: new Date().toISOString(),
    messages: [],
  };
}

function createNewConversation() {
  const conversation = createConversation();
  chatHistory.unshift(conversation);
  currentConversation = conversation;
  saveHistory();
  renderHistory();
  renderConversation();
  messageInputEl.focus();
}

function selectConversation(id) {
  const conversation = chatHistory.find((c) => c.id === id);
  if (conversation) {
    currentConversation = conversation;
    renderHistory();
    renderConversation();
  }
}

function renderHistory() {
  historyListEl.innerHTML = "";
  chatHistory.forEach((conversation) => {
    const li = document.createElement("li");
    li.className =
      "history-item" +
      (currentConversation?.id === conversation.id ? " active" : "");
    li.tabIndex = 0;
    li.setAttribute("role", "button");
    li.onclick = () => selectConversation(conversation.id);
    li.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectConversation(conversation.id);
      }
    };
    li.textContent = conversation.title;
    historyListEl.appendChild(li);
  });
}

function renderConversation() {
  chatMessagesEl.innerHTML = "";
  if (!currentConversation) return;

  currentConversation.messages.forEach((message) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${message.role}`;
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.innerHTML = marked.parse(message.content);
    messageDiv.appendChild(bubble);
    chatMessagesEl.appendChild(messageDiv);
  });

  if (isLoading) {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message assistant typing";
    const typingBubble = document.createElement("div");
    typingBubble.className = "message-bubble";
    typingBubble.innerHTML =
      '<span class="typing-dots"><span></span><span></span><span></span></span>';
    typingDiv.appendChild(typingBubble);
    chatMessagesEl.appendChild(typingDiv);
  }

  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

async function sendMessage() {
  if (isLoading) return;
  const text = messageInputEl.value.trim();
  if (!text) return;

  if (!currentConversation) {
    createNewConversation();
  }

  const userMessage = { role: "user", content: text };
  currentConversation.messages.push(userMessage);
  updateTitle();
  saveHistory();
  renderConversation();
  messageInputEl.value = "";
  adjustTextareaHeight();
  statusEl.textContent = "Sending...";

  await fetchReply();
}

async function fetchReply() {
  if (!currentConversation) return;
  setLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: currentConversation.messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API error");
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content || "No response content returned.";

    const assistantMessage = { role: "assistant", content: reply };
    currentConversation.messages.push(assistantMessage);
    updateTitle();
    saveHistory();
    renderConversation();
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Error: " + error.message;
  } finally {
    setLoading(false);
  }
}

function setLoading(active) {
  isLoading = active;
  sendBtnEl.disabled = active;
  messageInputEl.disabled = active;
  loaderEl.classList.toggle("active", active);
  statusEl.textContent = active ? "Assistant is typing…" : "Ready to chat";
  renderConversation();
}

function updateTitle() {
  if (!currentConversation) return;
  const firstUserMessage = currentConversation.messages.find(
    (m) => m.role === "user",
  );
  if (firstUserMessage) {
    currentConversation.title =
      firstUserMessage.content.length > 30
        ? firstUserMessage.content.slice(0, 30) + "..."
        : firstUserMessage.content;
  }
}

function init() {
  loadHistory();
  if (chatHistory.length === 0) {
    createNewConversation();
  } else {
    currentConversation = chatHistory[0];
    renderHistory();
    renderConversation();
  }

  sendBtnEl.addEventListener("click", sendMessage);
  newChatBtnEl.addEventListener("click", createNewConversation);
  messageInputEl.addEventListener("input", adjustTextareaHeight);
  messageInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  adjustTextareaHeight();
}

init();
