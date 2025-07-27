import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "أهلاً بك! أنا مساعد البيام. كيف يمكنني مساعدتك؟" },
  ]);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("chat");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input, subject: "عام" }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  const resources = [
    {
      subject: "رياضيات",
      type: "ملخص",
      title: "ملخص الجبر للسنة 4 متوسط",
      link: "/files/math_summary.pdf",
    },
    {
      subject: "علوم",
      type: "تمرين",
      title: "تمارين حول الوراثة",
      link: "/files/science_exercises.pdf",
    },
    {
      subject: "لغة عربية",
      type: "موضوع بيام",
      title: "موضوع بيام 2022",
      link: "/files/ar_bem_2022.pdf",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#f7f7f8]">
      <div className="flex border-b">
        <button
          onClick={() => setTab("chat")}
          className={`flex-1 py-2 text-center ${
            tab === "chat" ? "bg-white border-b-2 border-blue-500 font-bold" : "bg-gray-100"
          }`}
        >
          💬 الدردشة
        </button>
        <button
          onClick={() => setTab("resources")}
          className={`flex-1 py-2 text-center ${
            tab === "resources" ? "bg-white border-b-2 border-blue-500 font-bold" : "bg-gray-100"
          }`}
        >
          📚 المراجعة
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {tab === "chat" ? (
          <>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 text-sm rounded-lg shadow">
              <p className="mb-1">
                ⚠️ <strong>تنبيه:</strong> مساعد البيام يعمل بالذكاء الاصطناعي وقد يخطئ أحيانًا. يُرجى دائمًا التحقق من المعلومات المهمة أو استشارة الأستاذ.
              </p>
              <hr className="my-2 border-yellow-300" />
              <p>
                🛠️ تم تطوير هذا الموقع بواسطة <strong>محمد لوشان</strong>، أحد الناجحين في شهادة التعليم المتوسط من ولاية <strong>باتنة</strong>، لمساعدة التلاميذ في التحضير للبيام.
              </p>
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`whitespace-pre-line px-4 py-2 rounded-lg max-w-xl ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-white text-gray-800 self-start mr-auto"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="text-sm text-gray-500">...جاري توليد الرد</div>}
          </>
        ) : (
          <div className="space-y-4">
            {resources.map((res, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg bg-white shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{res.title}</h3>
                  <p className="text-sm text-gray-600">
                    {res.subject} – {res.type}
                  </p>
                </div>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  تحميل
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {tab === "chat" && (
        <div className="p-4 bg-white flex items-center border-t">
          <input
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 mr-2"
            placeholder="اكتب سؤالك هنا..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={sendMessage}
          >
            إرسال
          </button>
        </div>
      )}
    </div>
  );
}
