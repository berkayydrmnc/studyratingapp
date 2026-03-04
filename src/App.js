import { useState } from "react";

const COLORS = {
  bg: "#0f0e17",
  card: "#1a1825",
  cardHover: "#211f30",
  accent: "#e8c547",
  accentDim: "#c9a93a",
  text: "#fffffe",
  textMuted: "#a7a9be",
  textDim: "#6b6d84",
  border: "#2a2840",
  green: "#4caf88",
  red: "#e05c6a",
  blue: "#5b8dee",
  tag: "#252338",
};

const UNIVERSITIES = [
  "ODTÜ",
  "Boğaziçi Üniversitesi",
  "İTÜ",
  "Bilkent Üniversitesi",
  "Hacettepe Üniversitesi",
  "Ankara Üniversitesi",
  "İstanbul Üniversitesi",
  "Koç Üniversitesi",
  "Sabancı Üniversitesi",
  "METU NCC",
  "Yıldız Teknik",
  "Ege Üniversitesi",
  "Dokuz Eylül",
  "Gazi Üniversitesi",
  "Diğer",
];

const SAMPLE_COURSES = [
  {
    id: 1,
    code: "BIL301",
    name: "Veri Yapıları ve Algoritmalar",
    dept: "Bilgisayar Mühendisliği",
    credits: 4,
    instructor: "Prof. Dr. Ahmet Yılmaz",
    university: "ODTÜ",
  },
  {
    id: 2,
    code: "MAT201",
    name: "Lineer Cebir",
    dept: "Matematik",
    credits: 3,
    instructor: "Doç. Dr. Elif Kaya",
    university: "Boğaziçi Üniversitesi",
  },
  {
    id: 3,
    code: "FIZ101",
    name: "Genel Fizik I",
    dept: "Fizik",
    credits: 4,
    instructor: "Prof. Dr. Mehmet Demir",
    university: "İTÜ",
  },
  {
    id: 4,
    code: "BIL401",
    name: "Makine Öğrenmesi",
    dept: "Bilgisayar Mühendisliği",
    credits: 3,
    instructor: "Doç. Dr. Selin Arslan",
    university: "Bilkent Üniversitesi",
  },
  {
    id: 5,
    code: "ING201",
    name: "Teknik İngilizce",
    dept: "Yabancı Diller",
    credits: 2,
    instructor: "Dr. Ayşe Çelik",
    university: "ODTÜ",
  },
  {
    id: 6,
    code: "BIL201",
    name: "Nesne Yönelimli Programlama",
    dept: "Bilgisayar Mühendisliği",
    credits: 4,
    instructor: "Yrd. Doç. Dr. Can Öztürk",
    university: "Hacettepe Üniversitesi",
  },
  {
    id: 7,
    code: "MAT301",
    name: "Olasılık ve İstatistik",
    dept: "Matematik",
    credits: 3,
    instructor: "Prof. Dr. Hasan Şahin",
    university: "Boğaziçi Üniversitesi",
  },
  {
    id: 8,
    code: "BIL202",
    name: "İşletim Sistemleri",
    dept: "Bilgisayar Mühendisliği",
    credits: 3,
    instructor: "Doç. Dr. Zeynep Koç",
    university: "İTÜ",
  },
];

const FRIENDS = [
  {
    id: "berke",
    name: "Berke Doğan",
    avatar: "BD",
    university: "ODTÜ",
    dept: "Bilgisayar Müh.",
    following: true,
    logged: [
      {
        courseId: 1,
        rating: 4,
        note: "Zorlu ama öğretici, hocası harika anlatıyor.",
        semester: "2024 Güz",
        grade: "BA",
        time: "2s önce",
      },
      {
        courseId: 3,
        rating: 3,
        note: "Fizik sevmiyorum ama geçtim...",
        semester: "2024 Güz",
        grade: "CC",
        time: "1g önce",
      },
    ],
    wishlist: [4],
  },
  {
    id: "aylin",
    name: "Aylin Şen",
    avatar: "AŞ",
    university: "Boğaziçi Üniversitesi",
    dept: "Matematik",
    following: true,
    logged: [
      {
        courseId: 2,
        rating: 5,
        note: "En sevdiğim ders! Matris işlemleri çok mantıklı.",
        semester: "2024 Bahar",
        grade: "AA",
        time: "4s önce",
      },
      {
        courseId: 6,
        rating: 4,
        note: "OOP kavradıktan sonra her şey yerine oturuyor.",
        semester: "2024 Güz",
        grade: "BA",
        time: "2g önce",
      },
    ],
    wishlist: [7],
  },
  {
    id: "mert",
    name: "Mert Uysal",
    avatar: "MU",
    university: "İTÜ",
    dept: "Yazılım Müh.",
    following: true,
    logged: [
      {
        courseId: 4,
        rating: 5,
        note: "ML harika, kesinlikle tavsiye ederim!",
        semester: "2024 Güz",
        grade: "AA",
        time: "1g önce",
      },
      {
        courseId: 8,
        rating: 2,
        note: "Konu ilginç ama ders işleyişi berbat...",
        semester: "2023 Güz",
        grade: "DC",
        time: "3g önce",
      },
    ],
    wishlist: [1],
  },
  {
    id: "zeynep",
    name: "Zeynep Kara",
    avatar: "ZK",
    university: "Bilkent Üniversitesi",
    dept: "Endüstri Müh.",
    following: false,
    logged: [
      {
        courseId: 7,
        rating: 4,
        note: "İstatistik hayat kurtarıyor, tavsiye ederim.",
        semester: "2024 Bahar",
        grade: "BA",
        time: "5s önce",
      },
    ],
    wishlist: [2],
  },
];

function StarRating({ value, onChange, size = 20 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          style={{
            fontSize: size,
            cursor: onChange ? "pointer" : "default",
            color: star <= (hovered || value) ? COLORS.accent : COLORS.border,
            transition: "color 0.15s",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ initials, size = 36 }) {
  const colors = ["#e8c547", "#4caf88", "#5b8dee", "#e05c6a", "#a78bfa"];
  const idx = initials.charCodeAt(0) % colors.length;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: colors[idx],
        color: "#0f0e17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: size * 0.35,
        flexShrink: 0,
        fontFamily: "'DM Serif Display', serif",
      }}
    >
      {initials}
    </div>
  );
}

function CourseCard({
  course,
  logEntry,
  onLog,
  onWishlist,
  isWishlisted,
  compact = false,
}) {
  const deptColor =
    {
      "Bilgisayar Mühendisliği": COLORS.blue,
      Matematik: COLORS.green,
      Fizik: "#e05c6a",
      "Yabancı Diller": "#a78bfa",
    }[course.dept] || COLORS.textMuted;

  return (
    <div
      style={{
        background: COLORS.card,
        borderRadius: 16,
        padding: compact ? "14px 16px" : "18px",
        border: `1px solid ${COLORS.border}`,
        marginBottom: 10,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: deptColor,
                background: deptColor + "22",
                borderRadius: 6,
                padding: "2px 7px",
                letterSpacing: 0.5,
              }}
            >
              {course.code}
            </span>
            <span style={{ fontSize: 11, color: COLORS.textDim }}>
              {course.credits} kredi
            </span>
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.text,
              lineHeight: 1.3,
              marginBottom: 3,
            }}
          >
            {course.name}
          </div>
          {!compact && (
            <div style={{ fontSize: 12, color: COLORS.textDim }}>
              {course.instructor}
            </div>
          )}
          {course.university && (
            <div style={{ marginTop: 3 }}>
              <span
                style={{ fontSize: 11, color: COLORS.accent, fontWeight: 600 }}
              >
                🎓 {course.university}
              </span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, marginLeft: 10 }}>
          {onWishlist && (
            <button
              onClick={() => onWishlist(course.id)}
              style={{
                background: isWishlisted ? COLORS.accent + "22" : "transparent",
                border: `1px solid ${
                  isWishlisted ? COLORS.accent : COLORS.border
                }`,
                borderRadius: 8,
                padding: "6px 10px",
                cursor: "pointer",
                color: isWishlisted ? COLORS.accent : COLORS.textDim,
                fontSize: 15,
                transition: "all 0.15s",
              }}
            >
              🔖
            </button>
          )}
          {onLog && (
            <button
              onClick={() => onLog(course)}
              style={{
                background: logEntry ? COLORS.accent : "transparent",
                border: `1px solid ${logEntry ? COLORS.accent : COLORS.border}`,
                borderRadius: 8,
                padding: "6px 12px",
                cursor: "pointer",
                color: logEntry ? "#0f0e17" : COLORS.textMuted,
                fontSize: 12,
                fontWeight: 700,
                transition: "all 0.15s",
              }}
            >
              {logEntry ? "✓ Loglandı" : "+ Logla"}
            </button>
          )}
        </div>
      </div>
      {logEntry && (
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <StarRating value={logEntry.rating} size={16} />
            {logEntry.university && (
              <span
                style={{ fontSize: 11, color: COLORS.accent, fontWeight: 600 }}
              >
                🎓 {logEntry.university}
              </span>
            )}
          </div>
          {logEntry.grade && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                background: COLORS.accent + "22",
                color: COLORS.accent,
                borderRadius: 6,
                padding: "2px 8px",
                marginBottom: 4,
                display: "inline-block",
              }}
            >
              {logEntry.grade} · {logEntry.semester}
            </span>
          )}
          {logEntry.note && (
            <div
              style={{
                fontSize: 13,
                color: COLORS.textMuted,
                marginTop: 5,
                fontStyle: "italic",
              }}
            >
              "{logEntry.note}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FeedPost({
  friend,
  entry,
  course,
  liked,
  onLike,
  onWishlist,
  isWishlisted,
  comments,
  onAddComment,
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentFocused, setCommentFocused] = useState(false);

  const deptColor =
    {
      "Bilgisayar Mühendisliği": COLORS.blue,
      Matematik: COLORS.green,
      Fizik: "#e05c6a",
      "Yabancı Diller": "#a78bfa",
    }[course?.dept] || COLORS.textMuted;

  const gradeColor =
    {
      AA: COLORS.green,
      BA: COLORS.green,
      BB: "#a78bfa",
      CB: "#a78bfa",
      CC: COLORS.textMuted,
      DC: COLORS.red,
      DD: COLORS.red,
      FF: COLORS.red,
    }[entry.grade] || COLORS.textMuted;

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    onAddComment(commentText.trim());
    setCommentText("");
  };

  return (
    <div
      style={{
        background: COLORS.card,
        borderRadius: 18,
        padding: "16px",
        border: `1px solid ${COLORS.border}`,
        marginBottom: 12,
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* Kullanıcı bilgisi */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <Avatar initials={friend.avatar} size={38} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
              {friend.name}
            </span>
            {friend.following && (
              <span
                style={{
                  fontSize: 10,
                  color: COLORS.green,
                  background: COLORS.green + "22",
                  borderRadius: 5,
                  padding: "1px 6px",
                  fontWeight: 700,
                }}
              >
                takip
              </span>
            )}
          </div>
          <div style={{ fontSize: 11, color: COLORS.textDim }}>
            🎓 {friend.university} · {entry.time}
          </div>
        </div>
        <div style={{ fontSize: 11, color: COLORS.textDim }}>
          {entry.semester}
        </div>
      </div>

      {/* Ders bilgisi */}
      <div
        style={{
          background: COLORS.bg,
          borderRadius: 12,
          padding: "12px 14px",
          border: `1px solid ${COLORS.border}`,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 5,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: deptColor,
                  background: deptColor + "22",
                  borderRadius: 6,
                  padding: "2px 7px",
                }}
              >
                {course?.code}
              </span>
              {entry.grade && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: gradeColor,
                    background: gradeColor + "22",
                    borderRadius: 6,
                    padding: "2px 7px",
                  }}
                >
                  {entry.grade}
                </span>
              )}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
              {course?.name}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>
              {course?.instructor}
            </div>
          </div>
          <StarRating value={entry.rating} size={14} />
        </div>
      </div>

      {/* Değerlendirme notu */}
      {entry.note && (
        <div
          style={{
            fontSize: 14,
            color: COLORS.textMuted,
            fontStyle: "italic",
            lineHeight: 1.6,
            marginBottom: 12,
            paddingLeft: 12,
            borderLeft: `2px solid ${COLORS.accent}44`,
          }}
        >
          "{entry.note}"
        </div>
      )}

      {/* Aksiyonlar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: showComments || comments.length > 0 ? 14 : 0,
        }}
      >
        <button
          onClick={() => onLike()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: liked ? "#e05c6a22" : "transparent",
            border: `1px solid ${liked ? COLORS.red : COLORS.border}`,
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
            color: liked ? COLORS.red : COLORS.textDim,
            fontSize: 13,
            fontWeight: 600,
            transition: "all 0.15s",
          }}
        >
          {liked ? "❤️" : "🤍"}{" "}
          <span style={{ fontSize: 12 }}>{liked ? "Beğenildi" : "Beğen"}</span>
        </button>

        <button
          onClick={() => {
            setShowComments((v) => !v);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: showComments ? COLORS.blue + "22" : "transparent",
            border: `1px solid ${showComments ? COLORS.blue : COLORS.border}`,
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
            color: showComments ? COLORS.blue : COLORS.textDim,
            fontSize: 13,
            fontWeight: 600,
            transition: "all 0.15s",
          }}
        >
          💬{" "}
          <span style={{ fontSize: 12 }}>
            {comments.length > 0 ? `${comments.length} Yorum` : "Yorum Yap"}
          </span>
        </button>

        <button
          onClick={() => onWishlist(course?.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: isWishlisted ? COLORS.accent + "22" : "transparent",
            border: `1px solid ${isWishlisted ? COLORS.accent : COLORS.border}`,
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
            color: isWishlisted ? COLORS.accent : COLORS.textDim,
            fontSize: 13,
            fontWeight: 600,
            transition: "all 0.15s",
          }}
        >
          🔖{" "}
          <span style={{ fontSize: 12 }}>
            {isWishlisted ? "Listede" : "Kaydet"}
          </span>
        </button>
      </div>

      {/* Yorumlar bölümü */}
      {(showComments || comments.length > 0) && (
        <div
          style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}
        >
          {/* Mevcut yorumlar */}
          {comments.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              {comments.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                    marginBottom: 10,
                    animation: "fadeIn 0.2s ease",
                  }}
                >
                  <Avatar initials={c.avatar} size={28} />
                  <div
                    style={{
                      flex: 1,
                      background: COLORS.bg,
                      borderRadius: 12,
                      padding: "8px 12px",
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: COLORS.text,
                        }}
                      >
                        {c.name}
                      </span>
                      <span style={{ fontSize: 10, color: COLORS.textDim }}>
                        {c.time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: COLORS.textMuted,
                        lineHeight: 1.5,
                      }}
                    >
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Yorum yazma alanı */}
          {showComments && (
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <Avatar initials="SY" size={28} />
              <div
                style={{
                  flex: 1,
                  background: COLORS.bg,
                  borderRadius: 12,
                  border: `1px solid ${
                    commentFocused ? COLORS.accent : COLORS.border
                  }`,
                  padding: "8px 12px",
                  transition: "border-color 0.2s",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                }}
              >
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onFocus={() => setCommentFocused(true)}
                  onBlur={() => setCommentFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendComment();
                    }
                  }}
                  placeholder="Yorum yaz..."
                  rows={1}
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    color: COLORS.text,
                    fontSize: 13,
                    fontFamily: "inherit",
                    resize: "none",
                    lineHeight: 1.5,
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSendComment}
                  disabled={!commentText.trim()}
                  style={{
                    background: commentText.trim()
                      ? COLORS.accent
                      : COLORS.border,
                    border: "none",
                    borderRadius: 8,
                    width: 30,
                    height: 30,
                    cursor: commentText.trim() ? "pointer" : "default",
                    color: commentText.trim() ? "#0f0e17" : COLORS.textDim,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s",
                    flexShrink: 0,
                  }}
                >
                  ↑
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LogModal({ course, existing, onSave, onClose }) {
  const [rating, setRating] = useState(existing?.rating || 0);
  const [note, setNote] = useState(existing?.note || "");
  const [semester, setSemester] = useState(existing?.semester || "2024 Güz");
  const [grade, setGrade] = useState(existing?.grade || "");
  const [university, setUniversity] = useState(
    existing?.university || course.university || ""
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000bb",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: COLORS.card,
          borderRadius: "20px 20px 0 0",
          padding: "24px 20px 36px",
          width: "100%",
          maxWidth: 480,
          border: `1px solid ${COLORS.border}`,
          animation: "slideUp 0.25s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 40,
            height: 4,
            background: COLORS.border,
            borderRadius: 2,
            margin: "0 auto 20px",
          }}
        />
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: COLORS.text,
            marginBottom: 4,
            fontFamily: "'DM Serif Display', serif",
          }}
        >
          {course.name}
        </div>
        <div style={{ fontSize: 13, color: COLORS.textDim, marginBottom: 20 }}>
          {course.code}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textMuted,
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            PUAN
          </div>
          <StarRating value={rating} onChange={setRating} size={32} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              DÖNEM
            </div>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              style={{
                width: "100%",
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: COLORS.text,
                fontSize: 13,
              }}
            >
              {["2024 Güz", "2024 Bahar", "2023 Güz", "2023 Bahar"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              NOT
            </div>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={{
                width: "100%",
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: COLORS.text,
                fontSize: 13,
              }}
            >
              <option value="">Seç</option>
              {["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FF"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textMuted,
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            ÜNİVERSİTE
          </div>
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            style={{
              width: "100%",
              background: COLORS.bg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: "10px 12px",
              color: COLORS.text,
              fontSize: 13,
            }}
          >
            <option value="">Seç veya boş bırak</option>
            {UNIVERSITIES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textMuted,
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            YORUM
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bu ders hakkında ne düşünüyorsun?"
            rows={3}
            style={{
              width: "100%",
              background: COLORS.bg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: "12px",
              color: COLORS.text,
              fontSize: 13,
              resize: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={() => onSave({ rating, note, semester, grade, university })}
          style={{
            width: "100%",
            background: COLORS.accent,
            border: "none",
            borderRadius: 12,
            padding: "14px",
            color: "#0f0e17",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "'DM Serif Display', serif",
          }}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}

function AddCourseModal({ onAdd, onClose }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [dept, setDept] = useState("Bilgisayar Mühendisliği");
  const [credits, setCredits] = useState("3");
  const [instructor, setInstructor] = useState("");
  const [university, setUniversity] = useState("");

  const depts = [
    "Bilgisayar Mühendisliği",
    "Matematik",
    "Fizik",
    "Yabancı Diller",
    "Elektrik-Elektronik",
    "Endüstri Mühendisliği",
    "İşletme",
    "Diğer",
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000bb",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: COLORS.card,
          borderRadius: "20px 20px 0 0",
          padding: "24px 20px 36px",
          width: "100%",
          maxWidth: 480,
          border: `1px solid ${COLORS.border}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 40,
            height: 4,
            background: COLORS.border,
            borderRadius: 2,
            margin: "0 auto 20px",
          }}
        />
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: COLORS.text,
            marginBottom: 20,
            fontFamily: "'DM Serif Display', serif",
          }}
        >
          Yeni Ders Ekle
        </div>
        {[
          {
            label: "DERS KODU",
            val: code,
            set: setCode,
            placeholder: "BIL301",
          },
          {
            label: "DERS ADI",
            val: name,
            set: setName,
            placeholder: "Veri Yapıları",
          },
          {
            label: "ÖĞRETİM ÜYESİ",
            val: instructor,
            set: setInstructor,
            placeholder: "Prof. Dr. ...",
          },
        ].map((f) => (
          <div key={f.label} style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              {f.label}
            </div>
            <input
              value={f.val}
              onChange={(e) => f.set(e.target.value)}
              placeholder={f.placeholder}
              style={{
                width: "100%",
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: COLORS.text,
                fontSize: 13,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              BÖLÜM
            </div>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              style={{
                width: "100%",
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: COLORS.text,
                fontSize: 13,
              }}
            >
              {depts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              KREDİ
            </div>
            <select
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              style={{
                width: "100%",
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: COLORS.text,
                fontSize: 13,
              }}
            >
              {["1", "2", "3", "4", "5", "6"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textMuted,
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            ÜNİVERSİTE
          </div>
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            style={{
              width: "100%",
              background: COLORS.bg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: "10px 12px",
              color: COLORS.text,
              fontSize: 13,
            }}
          >
            <option value="">Seç (opsiyonel)</option>
            {UNIVERSITIES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            if (!code || !name) return;
            onAdd({
              id: Date.now(),
              code,
              name,
              dept,
              credits: parseInt(credits),
              instructor,
              university,
            });
          }}
          style={{
            width: "100%",
            background: COLORS.accent,
            border: "none",
            borderRadius: 12,
            padding: "14px",
            color: "#0f0e17",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "'DM Serif Display', serif",
          }}
        >
          Ekle
        </button>
      </div>
    </div>
  );
}

export default function CourseBox() {
  const [tab, setTab] = useState("akis");
  const [courses, setCourses] = useState(SAMPLE_COURSES);
  const [logs, setLogs] = useState({
    1: {
      rating: 5,
      note: "Hayatımda aldığım en iyi ders. Algoritma düşüncesi tamamen değişti.",
      semester: "2024 Güz",
      grade: "AA",
      university: "ODTÜ",
    },
    5: {
      rating: 2,
      note: "Teknik İngilizce fazla sıkıcı geldi.",
      semester: "2023 Güz",
      grade: "BB",
      university: "ODTÜ",
    },
  });
  const [wishlist, setWishlist] = useState([4, 7]);
  const [logModal, setLogModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [likes, setLikes] = useState({});
  const [postComments, setPostComments] = useState({
    "berke-0": [
      {
        name: "Aylin Şen",
        avatar: "AŞ",
        text: "Kesinlikle katılıyorum, hoca çok iyi anlatıyor!",
        time: "1s önce",
      },
    ],
    "aylin-0": [
      {
        name: "Mert Uysal",
        avatar: "MU",
        text: "Ben de aynı dersi aldım, harika bir ders.",
        time: "3s önce",
      },
      {
        name: "Berke Doğan",
        avatar: "BD",
        text: "Bence de 5 yıldızı hak ediyor 👏",
        time: "1s önce",
      },
    ],
  });
  const [followState, setFollowState] = useState({
    berke: true,
    aylin: true,
    mert: true,
    zeynep: false,
  });
  const [globalSearch, setGlobalSearch] = useState("");
  const [globalSearchFocused, setGlobalSearchFocused] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState(
    "Bilgisayar mühendisliği öğrencisi. Algoritma ve yapay zeka tutkunu. ☕"
  );
  const [editingProfile, setEditingProfile] = useState(false);
  const [editBio, setEditBio] = useState(bio);
  const [classYear, setClassYear] = useState("3");
  const [editClassYear, setEditClassYear] = useState("3");
  const [socialModal, setSocialModal] = useState(null); // "takipçiler" | "takip edilenler" | null

  const followingCount = Object.values(followState).filter(Boolean).length;
  const followersCount = 12; // simüle edilmiş

  // Simüle edilmiş takipçi listesi
  const FOLLOWERS = [
    {
      id: "zeynep",
      name: "Zeynep Kara",
      avatar: "ZK",
      university: "Bilkent",
      dept: "Endüstri Müh.",
    },
    {
      id: "emre",
      name: "Emre Taş",
      avatar: "ET",
      university: "İTÜ",
      dept: "Bilgisayar Müh.",
    },
    {
      id: "sude",
      name: "Sude Aydın",
      avatar: "SA",
      university: "ODTÜ",
      dept: "Matematik",
    },
    {
      id: "can",
      name: "Can Yıldırım",
      avatar: "CY",
      university: "Boğaziçi",
      dept: "Fizik",
    },
    {
      id: "nil",
      name: "Nil Arslan",
      avatar: "NA",
      university: "Hacettepe",
      dept: "Yazılım Müh.",
    },
  ];

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSaveLog = (courseId, data) => {
    setLogs((prev) => ({ ...prev, [courseId]: data }));
    setLogModal(null);
  };

  const loggedCourses = courses.filter((c) => logs[c.id]);
  const wishlistCourses = courses.filter((c) => wishlist.includes(c.id));
  const filtered = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.dept.toLowerCase().includes(search.toLowerCase())
  );

  const avgRating =
    loggedCourses.length > 0
      ? (
          loggedCourses.reduce((sum, c) => sum + (logs[c.id]?.rating || 0), 0) /
          loggedCourses.length
        ).toFixed(1)
      : "—";

  return (
    <div
      style={{
        background: "#070612",
        minHeight: "100vh",
        fontFamily: "'Outfit', sans-serif",
        color: COLORS.text,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        select, input, textarea { outline: none; }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .desktop-sidebar {
          display: none;
        }
        .desktop-right {
          display: none;
        }
        @media (min-width: 768px) {
          .desktop-sidebar {
            display: flex;
            flex-direction: column;
            width: 220px;
            padding: 32px 16px;
            position: sticky;
            top: 0;
            height: 100vh;
            flex-shrink: 0;
          }
          .desktop-right {
            display: block;
            width: 280px;
            padding: 32px 16px;
            flex-shrink: 0;
          }
          .mobile-header-bar {
            display: none !important;
          }
          .mobile-bottom-nav {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-sidebar { display: none !important; }
          .desktop-right { display: none !important; }
        }
      `}</style>

      {/* DESKTOP SOL SIDEBAR */}
      <div className="desktop-sidebar" style={{ color: COLORS.text }}>
        <div style={{ marginBottom: 36 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              fontFamily: "'DM Serif Display', serif",
              color: COLORS.accent,
              letterSpacing: -0.5,
            }}
          >
            StudyRating
          </div>
          <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>
            Logla, yorumla, keşfet
          </div>
        </div>

        {[
          { id: "akis", icon: "🏠", label: "Akış" },
          { id: "kesfet", icon: "🔭", label: "Keşfet" },
          { id: "dagarcik", icon: "📚", label: "Derslerim" },
          { id: "ara", icon: "🔍", label: "Ara" },
          { id: "arkadaslar", icon: "👥", label: "Arkadaşlar" },
          { id: "profil", icon: "👤", label: "Profil" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              padding: "11px 14px",
              borderRadius: 12,
              border: "none",
              background: tab === t.id ? COLORS.accent + "18" : "transparent",
              color: tab === t.id ? COLORS.accent : COLORS.textMuted,
              fontSize: 14,
              fontWeight: tab === t.id ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "inherit",
              marginBottom: 4,
              textAlign: "left",
              borderLeft:
                tab === t.id
                  ? `3px solid ${COLORS.accent}`
                  : "3px solid transparent",
            }}
          >
            <span style={{ fontSize: 18 }}>{t.icon}</span> {t.label}
          </button>
        ))}

        {/* Profil özeti altta */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px",
            background: COLORS.card,
            borderRadius: 12,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          {profilePhoto ? (
            <img
              src={profilePhoto}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Avatar initials="SY" size={36} />
          )}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>
              Selim Yıldız
            </div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>
              @selimyildiz
            </div>
          </div>
        </div>
      </div>

      {/* ANA İÇERİK */}
      <div
        style={{
          background: COLORS.bg,
          minHeight: "100vh",
          width: "100%",
          maxWidth: 480,
          position: "relative",
          borderLeft: "1px solid #1a1825",
          borderRight: "1px solid #1a1825",
        }}
      >
        {/* Header */}
        <div
          className="mobile-header-bar"
          style={{
            padding: "24px 20px 0",
            background: `linear-gradient(180deg, ${COLORS.bg} 0%, transparent 100%)`,
            position: "sticky",
            top: 0,
            zIndex: 50,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  fontFamily: "'DM Serif Display', serif",
                  color: COLORS.accent,
                  letterSpacing: -0.5,
                }}
              >
                StudyRating
              </div>
              <div
                style={{ fontSize: 12, color: COLORS.textDim, marginTop: -2 }}
              >
                Logla, yorumla, keşfet
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={() => setTab("ara")}
                style={{
                  background:
                    tab === "ara" ? COLORS.accent + "22" : COLORS.card,
                  border: `1px solid ${
                    tab === "ara" ? COLORS.accent : COLORS.border
                  }`,
                  borderRadius: 12,
                  width: 42,
                  height: 42,
                  cursor: "pointer",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                🔍
              </button>
              <Avatar initials="SY" size={42} />
            </div>
          </div>

          {tab === "ara" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: COLORS.card,
                borderRadius: 14,
                padding: "11px 16px",
                border: `1px solid ${
                  globalSearchFocused ? COLORS.accent : COLORS.border
                }`,
                marginBottom: 12,
                transition: "border-color 0.2s",
              }}
            >
              <span style={{ fontSize: 16, color: COLORS.textDim }}>🔍</span>
              <input
                autoFocus
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onFocus={() => setGlobalSearchFocused(true)}
                onBlur={() => setGlobalSearchFocused(false)}
                placeholder="Ders, okul, bölüm, not ara..."
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.text,
                  fontSize: 14,
                  flex: 1,
                  fontFamily: "inherit",
                }}
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch("")}
                  style={{
                    background: COLORS.border,
                    border: "none",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                    color: COLORS.textDim,
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Tabs - mobilde alt bar görevi görür */}
          <div
            className="mobile-bottom-nav"
            style={{
              display: "flex",
              gap: 3,
              background: COLORS.card,
              borderRadius: 14,
              padding: 4,
            }}
          >
            {[
              { id: "akis", label: "Akış" },
              { id: "kesfet", label: "Keşfet" },
              { id: "dagarcik", label: "Derslerim" },
              { id: "arkadaslar", label: "Arkadaşlar" },
              { id: "profil", label: "Profil" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1,
                  padding: "8px 2px",
                  borderRadius: 10,
                  border: "none",
                  background: tab === t.id ? COLORS.accent : "transparent",
                  color: tab === t.id ? "#0f0e17" : COLORS.textDim,
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          style={{ padding: "16px 20px 100px", animation: "fadeIn 0.3s ease" }}
        >
          {/* ARA */}
          {tab === "ara" &&
            (() => {
              const q = globalSearch.toLowerCase().trim();

              // Tüm loglar: arkadaşlar + kendi
              const allLogs = [
                // Kendi loglarım
                ...Object.entries(logs).map(([courseId, entry]) => {
                  const course = courses.find(
                    (c) => c.id === parseInt(courseId)
                  );
                  return {
                    owner: {
                      name: "Sen",
                      avatar: "SY",
                      university: "ODTÜ",
                      dept: "Bilgisayar Müh.",
                      isSelf: true,
                    },
                    entry: { ...entry, time: "şimdi" },
                    course,
                  };
                }),
                // Arkadaş logları
                ...FRIENDS.flatMap((friend) =>
                  friend.logged.map((entry) => ({
                    owner: friend,
                    entry,
                    course: courses.find((c) => c.id === entry.courseId),
                  }))
                ),
              ];

              const results =
                q.length < 2
                  ? []
                  : allLogs.filter(({ course, owner, entry }) => {
                      if (!course) return false;
                      return (
                        course.name.toLowerCase().includes(q) ||
                        course.code.toLowerCase().includes(q) ||
                        course.dept.toLowerCase().includes(q) ||
                        (course.university || "").toLowerCase().includes(q) ||
                        owner.university.toLowerCase().includes(q) ||
                        owner.name.toLowerCase().includes(q) ||
                        (entry.note || "").toLowerCase().includes(q) ||
                        (entry.grade || "").toLowerCase().includes(q)
                      );
                    });

              // Sık aranan etiketler
              const hotTags = [
                "Bilgisayar Mühendisliği",
                "ODTÜ",
                "Matematik",
                "AA",
                "Makine Öğrenmesi",
                "İTÜ",
              ];

              const deptColor = (dept) =>
                ({
                  "Bilgisayar Mühendisliği": COLORS.blue,
                  Matematik: COLORS.green,
                  Fizik: "#e05c6a",
                  "Yabancı Diller": "#a78bfa",
                }[dept] || COLORS.textMuted);

              return (
                <>
                  {/* Boş durum: popüler etiketler */}
                  {!q && (
                    <>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: COLORS.textDim,
                          marginBottom: 10,
                          letterSpacing: 0.5,
                        }}
                      >
                        POPÜLER ARAMALAR
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          marginBottom: 28,
                        }}
                      >
                        {hotTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setGlobalSearch(tag)}
                            style={{
                              background: COLORS.card,
                              border: `1px solid ${COLORS.border}`,
                              borderRadius: 20,
                              padding: "7px 14px",
                              cursor: "pointer",
                              color: COLORS.textMuted,
                              fontSize: 13,
                              fontWeight: 600,
                              fontFamily: "inherit",
                              transition: "all 0.15s",
                            }}
                          >
                            🔥 {tag}
                          </button>
                        ))}
                      </div>

                      {/* Son loglar özeti */}
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: COLORS.textDim,
                          marginBottom: 10,
                          letterSpacing: 0.5,
                        }}
                      >
                        SON LOGLANANLAR
                      </div>
                      {allLogs
                        .slice(0, 4)
                        .map(({ owner, entry, course }, i) => {
                          if (!course) return null;
                          const dc = deptColor(course.dept);
                          return (
                            <div
                              key={i}
                              style={{
                                background: COLORS.card,
                                borderRadius: 14,
                                padding: "12px 14px",
                                border: `1px solid ${COLORS.border}`,
                                marginBottom: 8,
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <Avatar initials={owner.avatar} size={36} />
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: COLORS.text,
                                  }}
                                >
                                  {course.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: COLORS.textDim,
                                  }}
                                >
                                  {owner.name} · {owner.university}
                                </div>
                              </div>
                              <StarRating value={entry.rating} size={13} />
                            </div>
                          );
                        })}
                    </>
                  )}

                  {/* Çok kısa sorgu */}
                  {q.length === 1 && (
                    <div
                      style={{
                        textAlign: "center",
                        color: COLORS.textDim,
                        padding: "40px 0",
                        fontSize: 14,
                      }}
                    >
                      En az 2 karakter gir...
                    </div>
                  )}

                  {/* Sonuç yok */}
                  {q.length >= 2 && results.length === 0 && (
                    <div style={{ textAlign: "center", padding: "50px 0" }}>
                      <div style={{ fontSize: 36, marginBottom: 12 }}>🔭</div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: COLORS.text,
                          marginBottom: 6,
                        }}
                      >
                        Sonuç bulunamadı
                      </div>
                      <div style={{ fontSize: 13, color: COLORS.textDim }}>
                        "{globalSearch}" için kayıt yok
                      </div>
                    </div>
                  )}

                  {/* Sonuçlar */}
                  {results.length > 0 && (
                    <>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: COLORS.textDim,
                          marginBottom: 12,
                          letterSpacing: 0.5,
                        }}
                      >
                        {results.length} SONUÇ
                      </div>
                      {results.map(({ owner, entry, course }, i) => {
                        const dc = deptColor(course.dept);
                        const gradeColor =
                          {
                            AA: COLORS.green,
                            BA: COLORS.green,
                            BB: "#a78bfa",
                            CB: "#a78bfa",
                            CC: COLORS.textMuted,
                            DC: COLORS.red,
                            DD: COLORS.red,
                            FF: COLORS.red,
                          }[entry.grade] || COLORS.textMuted;

                        // Highlight matching text
                        const highlight = (text) => {
                          if (!text || !q) return text;
                          const idx = text.toLowerCase().indexOf(q);
                          if (idx === -1) return text;
                          return (
                            <span>
                              {text.slice(0, idx)}
                              <span
                                style={{
                                  background: COLORS.accent + "44",
                                  color: COLORS.accent,
                                  borderRadius: 3,
                                  padding: "0 2px",
                                }}
                              >
                                {text.slice(idx, idx + q.length)}
                              </span>
                              {text.slice(idx + q.length)}
                            </span>
                          );
                        };

                        return (
                          <div
                            key={i}
                            style={{
                              background: COLORS.card,
                              borderRadius: 16,
                              padding: "14px",
                              border: `1px solid ${COLORS.border}`,
                              marginBottom: 10,
                              animation: "fadeIn 0.2s ease",
                            }}
                          >
                            {/* Kim logladı */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 10,
                              }}
                            >
                              <Avatar initials={owner.avatar} size={30} />
                              <div style={{ flex: 1 }}>
                                <span
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: COLORS.text,
                                  }}
                                >
                                  {owner.isSelf ? "Sen" : owner.name}
                                </span>
                                <span
                                  style={{
                                    fontSize: 11,
                                    color: COLORS.textDim,
                                  }}
                                >
                                  {" "}
                                  · {highlight(owner.university)} · {entry.time}
                                </span>
                              </div>
                              {entry.grade && (
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: gradeColor,
                                    background: gradeColor + "22",
                                    borderRadius: 6,
                                    padding: "2px 8px",
                                  }}
                                >
                                  {entry.grade}
                                </span>
                              )}
                            </div>

                            {/* Ders bilgisi */}
                            <div
                              style={{
                                background: COLORS.bg,
                                borderRadius: 12,
                                padding: "10px 12px",
                                marginBottom: entry.note ? 10 : 0,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                }}
                              >
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: 6,
                                      marginBottom: 4,
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: dc,
                                        background: dc + "22",
                                        borderRadius: 5,
                                        padding: "1px 6px",
                                      }}
                                    >
                                      {highlight(course.code)}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: 10,
                                        color: COLORS.textDim,
                                      }}
                                    >
                                      {highlight(course.dept)}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 700,
                                      color: COLORS.text,
                                    }}
                                  >
                                    {highlight(course.name)}
                                  </div>
                                  {course.university && (
                                    <div
                                      style={{
                                        fontSize: 11,
                                        color: COLORS.accent,
                                        marginTop: 2,
                                      }}
                                    >
                                      🎓 {highlight(course.university)}
                                    </div>
                                  )}
                                </div>
                                <StarRating value={entry.rating} size={13} />
                              </div>
                            </div>

                            {/* Yorum */}
                            {entry.note && (
                              <div
                                style={{
                                  fontSize: 13,
                                  color: COLORS.textMuted,
                                  fontStyle: "italic",
                                  paddingLeft: 10,
                                  borderLeft: `2px solid ${COLORS.accent}44`,
                                }}
                              >
                                "{highlight(entry.note)}"
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              );
            })()}

          {/* AKIŞ */}
          {tab === "akis" &&
            (() => {
              // Tüm friend loglarını zaman damgasına göre düzleştir
              const allPosts = FRIENDS.flatMap((friend) =>
                friend.logged.map((entry, i) => ({
                  key: `${friend.id}-${i}`,
                  friend: { ...friend, following: followState[friend.id] },
                  entry,
                  course: courses.find((c) => c.id === entry.courseId),
                }))
              ).sort((a, b) => {
                const order = [
                  "2s önce",
                  "4s önce",
                  "5s önce",
                  "1g önce",
                  "1g önce",
                  "2g önce",
                  "3g önce",
                ];
                return (
                  order.indexOf(a.entry.time) - order.indexOf(b.entry.time)
                );
              });

              return (
                <>
                  {/* Stories / Hızlı bakış */}
                  <div
                    style={{
                      marginBottom: 16,
                      overflowX: "auto",
                      display: "flex",
                      gap: 10,
                      paddingBottom: 4,
                    }}
                  >
                    {FRIENDS.map((f) => (
                      <div
                        key={f.id}
                        style={{
                          flexShrink: 0,
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            padding: 2,
                            borderRadius: "50%",
                            background: followState[f.id]
                              ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.blue})`
                              : COLORS.border,
                          }}
                        >
                          <div
                            style={{
                              padding: 2,
                              background: COLORS.bg,
                              borderRadius: "50%",
                            }}
                          >
                            <Avatar initials={f.avatar} size={46} />
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: COLORS.textMuted,
                            marginTop: 4,
                            maxWidth: 54,
                          }}
                        >
                          {f.name.split(" ")[0]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Filtre */}
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      marginBottom: 14,
                      overflowX: "auto",
                      paddingBottom: 2,
                    }}
                  >
                    {["Tümü", "Takip Edilenler", "Bu Hafta", "Yüksek Puan"].map(
                      (f, i) => (
                        <button
                          key={f}
                          style={{
                            flexShrink: 0,
                            background:
                              i === 0 ? COLORS.accent + "22" : "transparent",
                            border: `1px solid ${
                              i === 0 ? COLORS.accent : COLORS.border
                            }`,
                            borderRadius: 20,
                            padding: "5px 12px",
                            cursor: "pointer",
                            color: i === 0 ? COLORS.accent : COLORS.textDim,
                            fontSize: 12,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {f}
                        </button>
                      )
                    )}
                  </div>

                  {/* Feed posts */}
                  {allPosts.map(({ key, friend, entry, course }) => (
                    <FeedPost
                      key={key}
                      friend={friend}
                      entry={entry}
                      course={course}
                      liked={!!likes[key]}
                      onLike={() =>
                        setLikes((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                      onWishlist={toggleWishlist}
                      isWishlisted={course && wishlist.includes(course.id)}
                      comments={postComments[key] || []}
                      onAddComment={(text) =>
                        setPostComments((prev) => ({
                          ...prev,
                          [key]: [
                            ...(prev[key] || []),
                            {
                              name: "Selim Yıldız",
                              avatar: "SY",
                              text,
                              time: "şimdi",
                            },
                          ],
                        }))
                      }
                    />
                  ))}
                </>
              );
            })()}

          {/* KESFET */}
          {tab === "kesfet" &&
            (() => {
              // Tüm loglardan (arkadaşlar + kendi) kurs bazlı ortalama puan hesapla
              const allRatings = {};
              // Arkadaş logları
              FRIENDS.forEach((f) => {
                f.logged.forEach((entry) => {
                  if (!allRatings[entry.courseId])
                    allRatings[entry.courseId] = [];
                  allRatings[entry.courseId].push(entry.rating);
                });
              });
              // Kendi loglarım
              Object.entries(logs).forEach(([cId, entry]) => {
                if (entry.rating) {
                  if (!allRatings[cId]) allRatings[cId] = [];
                  allRatings[cId].push(entry.rating);
                }
              });

              const ratedCourses = courses
                .filter((c) => allRatings[c.id])
                .map((c) => ({
                  ...c,
                  avgRating:
                    allRatings[c.id].reduce((a, b) => a + b, 0) /
                    allRatings[c.id].length,
                  reviewCount: allRatings[c.id].length,
                }))
                .sort((a, b) => b.avgRating - a.avgRating);

              const topCourses = ratedCourses.slice(0, 3);
              const bottomCourses = [...ratedCourses].reverse().slice(0, 3);

              const RankCard = ({ course, rank, isTop }) => {
                const deptColor =
                  {
                    "Bilgisayar Mühendisliği": COLORS.blue,
                    Matematik: COLORS.green,
                    Fizik: "#e05c6a",
                    "Yabancı Diller": "#a78bfa",
                  }[course.dept] || COLORS.textMuted;

                const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
                const medals = ["🥇", "🥈", "🥉"];

                return (
                  <div
                    style={{
                      background: COLORS.card,
                      borderRadius: 14,
                      padding: "14px",
                      border: `1px solid ${
                        isTop
                          ? rank === 1
                            ? "#FFD70033"
                            : COLORS.border
                          : "#e05c6a22"
                      }`,
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {isTop && rank === 1 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 60,
                          height: 60,
                          background:
                            "radial-gradient(circle at top right, #FFD70018, transparent 70%)",
                        }}
                      />
                    )}
                    <div
                      style={{
                        fontSize: isTop ? 24 : 18,
                        flexShrink: 0,
                        width: 36,
                        textAlign: "center",
                      }}
                    >
                      {isTop ? (
                        medals[rank - 1]
                      ) : (
                        <span
                          style={{
                            color: COLORS.red,
                            fontWeight: 900,
                            fontSize: 16,
                          }}
                        >
                          #{rank}
                        </span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 3,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: deptColor,
                            background: deptColor + "22",
                            borderRadius: 5,
                            padding: "1px 6px",
                          }}
                        >
                          {course.code}
                        </span>
                        <span style={{ fontSize: 10, color: COLORS.textDim }}>
                          {course.reviewCount} yorum
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: COLORS.text,
                        }}
                      >
                        {course.name}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 900,
                          color: isTop ? COLORS.accent : COLORS.red,
                          fontFamily: "'DM Serif Display', serif",
                          lineHeight: 1,
                        }}
                      >
                        {course.avgRating.toFixed(1)}
                      </div>
                      <div style={{ fontSize: 10, color: COLORS.textDim }}>
                        / 5.0
                      </div>
                    </div>
                  </div>
                );
              };

              return (
                <>
                  {/* Arama + ekle */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: COLORS.card,
                        borderRadius: 12,
                        padding: "10px 14px",
                        border: `1px solid ${COLORS.border}`,
                      }}
                    >
                      <span style={{ color: COLORS.textDim }}>🔍</span>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Ders ara..."
                        style={{
                          background: "none",
                          border: "none",
                          color: COLORS.text,
                          fontSize: 14,
                          flex: 1,
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                    <button
                      onClick={() => setAddModal(true)}
                      style={{
                        background: COLORS.accent,
                        border: "none",
                        borderRadius: 12,
                        padding: "10px 14px",
                        color: "#0f0e17",
                        fontSize: 20,
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* En Yüksek Puanlılar — sadece arama yokken göster */}
                  {!search && topCourses.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 12,
                        }}
                      >
                        <span style={{ fontSize: 18 }}>🏆</span>
                        <span
                          style={{
                            fontSize: 16,
                            fontWeight: 800,
                            fontFamily: "'DM Serif Display', serif",
                            color: COLORS.text,
                          }}
                        >
                          En Yüksek Puanlı Dersler
                        </span>
                      </div>
                      <div
                        style={{
                          background: `linear-gradient(135deg, ${COLORS.accent}08, transparent)`,
                          border: `1px solid ${COLORS.accent}22`,
                          borderRadius: 18,
                          padding: "14px",
                        }}
                      >
                        {topCourses.map((course, i) => (
                          <RankCard
                            key={course.id}
                            course={course}
                            rank={i + 1}
                            isTop={true}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* En Düşük Puanlılar */}
                  {!search && bottomCourses.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 12,
                        }}
                      >
                        <span style={{ fontSize: 18 }}>💀</span>
                        <span
                          style={{
                            fontSize: 16,
                            fontWeight: 800,
                            fontFamily: "'DM Serif Display', serif",
                            color: COLORS.text,
                          }}
                        >
                          En Düşük Puanlı Dersler
                        </span>
                      </div>
                      <div
                        style={{
                          background: `linear-gradient(135deg, #e05c6a08, transparent)`,
                          border: `1px solid #e05c6a22`,
                          borderRadius: 18,
                          padding: "14px",
                        }}
                      >
                        {bottomCourses.map((course, i) => (
                          <RankCard
                            key={course.id}
                            course={course}
                            rank={i + 1}
                            isTop={false}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tüm Dersler */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>📋</span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        fontFamily: "'DM Serif Display', serif",
                        color: COLORS.text,
                      }}
                    >
                      {search ? `"${search}" sonuçları` : "Tüm Dersler"}
                    </span>
                    <span style={{ fontSize: 12, color: COLORS.textDim }}>
                      ({filtered.length})
                    </span>
                  </div>
                  {filtered.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      logEntry={logs[course.id]}
                      onLog={() => setLogModal(course)}
                      onWishlist={toggleWishlist}
                      isWishlisted={wishlist.includes(course.id)}
                    />
                  ))}
                </>
              );
            })()}

          {/* DAGARCIK */}
          {tab === "dagarcik" && (
            <>
              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {[
                  { label: "Ders", value: loggedCourses.length },
                  { label: "Ort. Puan", value: avgRating },
                  {
                    label: "Kredi",
                    value: loggedCourses.reduce((s, c) => s + c.credits, 0),
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: COLORS.card,
                      borderRadius: 14,
                      padding: "16px 12px",
                      border: `1px solid ${COLORS.border}`,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: COLORS.accent,
                        fontFamily: "'DM Serif Display', serif",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: COLORS.textDim,
                        marginTop: 2,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {loggedCourses.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: COLORS.textDim,
                    padding: "40px 0",
                    fontSize: 14,
                  }}
                >
                  Henüz hiç ders loglamadın.
                  <br />
                  <span style={{ color: COLORS.accent }}>Keşfet</span>{" "}
                  sekmesinden başla!
                </div>
              ) : (
                loggedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    logEntry={logs[course.id]}
                    onLog={() => setLogModal(course)}
                  />
                ))
              )}
            </>
          )}

          {/* IZLE */}
          {tab === "izle" && (
            <>
              <div
                style={{
                  fontSize: 13,
                  color: COLORS.textDim,
                  marginBottom: 16,
                }}
              >
                {wishlistCourses.length} ders izleme listende
              </div>
              {wishlistCourses.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: COLORS.textDim,
                    padding: "40px 0",
                    fontSize: 14,
                  }}
                >
                  İzleme listen boş.
                  <br />
                  <span style={{ color: COLORS.accent }}>🔖</span> ile ders
                  ekle!
                </div>
              ) : (
                wishlistCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onLog={() => setLogModal(course)}
                    onWishlist={toggleWishlist}
                    isWishlisted={true}
                  />
                ))
              )}
            </>
          )}

          {/* ARKADASLAR */}
          {tab === "arkadaslar" && (
            <>
              {/* Takip istatistikleri */}
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    flex: 1,
                    background: COLORS.card,
                    borderRadius: 14,
                    padding: "14px",
                    border: `1px solid ${COLORS.border}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: COLORS.accent,
                      fontFamily: "'DM Serif Display', serif",
                    }}
                  >
                    {followingCount}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textDim }}>
                    Takip Edilen
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: COLORS.card,
                    borderRadius: 14,
                    padding: "14px",
                    border: `1px solid ${COLORS.border}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: COLORS.accent,
                      fontFamily: "'DM Serif Display', serif",
                    }}
                  >
                    {followersCount}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textDim }}>
                    Takipçi
                  </div>
                </div>
              </div>

              {/* Keşfet başlığı */}
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: COLORS.text,
                  fontFamily: "'DM Serif Display', serif",
                  marginBottom: 12,
                }}
              >
                👥 Öğrenciler
              </div>
              {[
                ...FRIENDS,
                ...FOLLOWERS.filter(
                  (f) => !FRIENDS.find((fr) => fr.id === f.id)
                ),
              ].map((friend) => (
                <div
                  key={friend.id || friend.name}
                  style={{
                    background: COLORS.card,
                    borderRadius: 16,
                    padding: "14px 16px",
                    border: `1px solid ${
                      followState[friend.id]
                        ? COLORS.accent + "44"
                        : COLORS.border
                    }`,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <Avatar initials={friend.avatar} size={46} />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: COLORS.text,
                          }}
                        >
                          {friend.name}
                        </span>
                        {followState[friend.id] && (
                          <span
                            style={{
                              fontSize: 10,
                              color: COLORS.green,
                              background: COLORS.green + "22",
                              borderRadius: 5,
                              padding: "1px 6px",
                              fontWeight: 700,
                            }}
                          >
                            takip
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: COLORS.textDim,
                          marginTop: 1,
                        }}
                      >
                        🎓 {friend.university} · {friend.dept}
                      </div>
                      {friend.logged && (
                        <div
                          style={{
                            fontSize: 11,
                            color: COLORS.textDim,
                            marginTop: 1,
                          }}
                        >
                          {friend.logged.length} ders loglandı
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setFollowState((prev) => ({
                          ...prev,
                          [friend.id]: !prev[friend.id],
                        }))
                      }
                      style={{
                        background: followState[friend.id]
                          ? "transparent"
                          : COLORS.accent,
                        border: `1px solid ${
                          followState[friend.id] ? COLORS.border : COLORS.accent
                        }`,
                        borderRadius: 10,
                        padding: "7px 14px",
                        cursor: "pointer",
                        color: followState[friend.id]
                          ? COLORS.textMuted
                          : "#0f0e17",
                        fontSize: 12,
                        fontWeight: 700,
                        transition: "all 0.15s",
                        fontFamily: "inherit",
                        flexShrink: 0,
                      }}
                    >
                      {followState[friend.id] ? "Takiptesin" : "Takip Et"}
                    </button>
                  </div>

                  {/* Loglanan dersler (sadece arkadaşlar için) */}
                  {friend.logged && followState[friend.id] && (
                    <div
                      style={{
                        marginTop: 12,
                        paddingTop: 12,
                        borderTop: `1px solid ${COLORS.border}`,
                      }}
                    >
                      {friend.logged.slice(0, 2).map((entry, i) => {
                        const course = courses.find(
                          (c) => c.id === entry.courseId
                        );
                        if (!course) return null;
                        return (
                          <div
                            key={i}
                            style={{
                              background: COLORS.bg,
                              borderRadius: 10,
                              padding: "10px 12px",
                              marginBottom: 6,
                              border: `1px solid ${COLORS.border}`,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: COLORS.text,
                                }}
                              >
                                {course.name}
                              </div>
                              <div
                                style={{ fontSize: 11, color: COLORS.textDim }}
                              >
                                {course.code}{" "}
                                {entry.grade && (
                                  <span style={{ color: COLORS.accent }}>
                                    · {entry.grade}
                                  </span>
                                )}
                              </div>
                            </div>
                            <StarRating value={entry.rating} size={12} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
          {/* PROFİL */}
          {tab === "profil" && (
            <>
              {/* Profil Kartı */}
              <div
                style={{
                  background: COLORS.card,
                  borderRadius: 20,
                  padding: "24px 20px",
                  border: `1px solid ${COLORS.border}`,
                  marginBottom: 16,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Arka plan desen */}
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: COLORS.accent + "11",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: COLORS.accent + "08",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    marginBottom: 16,
                    position: "relative",
                  }}
                >
                  {/* Profil Fotoğrafı */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <label style={{ cursor: "pointer", display: "block" }}>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) =>
                              setProfilePhoto(ev.target.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="profil"
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: `3px solid ${COLORS.accent}`,
                          }}
                        />
                      ) : (
                        <div style={{ position: "relative" }}>
                          <Avatar initials="SY" size={80} />
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              borderRadius: "50%",
                              background: "#00000055",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 0,
                              transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.opacity = 1)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.opacity = 0)
                            }
                          >
                            <span style={{ fontSize: 20 }}>📷</span>
                          </div>
                        </div>
                      )}
                      {/* Kamera ikonu rozeti */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 2,
                          right: 2,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: COLORS.accent,
                          border: `2px solid ${COLORS.card}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          cursor: "pointer",
                        }}
                      >
                        📷
                      </div>
                    </label>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 2,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 900,
                          fontFamily: "'DM Serif Display', serif",
                          color: COLORS.text,
                        }}
                      >
                        Selim Yıldız
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: COLORS.textDim,
                        marginBottom: 4,
                      }}
                    >
                      @selimyildiz
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: COLORS.accent,
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      🎓 ODTÜ · Bilgisayar Müh. · {classYear}. Sınıf
                    </div>

                    {/* Biyografi */}
                    {!editingProfile ? (
                      <div
                        style={{
                          fontSize: 13,
                          color: COLORS.textMuted,
                          lineHeight: 1.5,
                        }}
                      >
                        {bio || (
                          <span
                            style={{
                              color: COLORS.textDim,
                              fontStyle: "italic",
                            }}
                          >
                            Biyografi ekle...
                          </span>
                        )}
                      </div>
                    ) : (
                      <>
                        <div style={{ marginBottom: 8 }}>
                          <div
                            style={{
                              fontSize: 11,
                              color: COLORS.textDim,
                              marginBottom: 4,
                              fontWeight: 600,
                            }}
                          >
                            SINIF
                          </div>
                          <div style={{ display: "flex", gap: 6 }}>
                            {["1", "2", "3", "4", "5"].map((y) => (
                              <button
                                key={y}
                                onClick={() => setEditClassYear(y)}
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 10,
                                  border: "none",
                                  cursor: "pointer",
                                  background:
                                    editClassYear === y
                                      ? COLORS.accent
                                      : COLORS.bg,
                                  color:
                                    editClassYear === y
                                      ? "#0f0e17"
                                      : COLORS.textDim,
                                  fontWeight: 800,
                                  fontSize: 13,
                                  fontFamily: "inherit",
                                  border: `1px solid ${
                                    editClassYear === y
                                      ? COLORS.accent
                                      : COLORS.border
                                  }`,
                                }}
                              >
                                {y}
                              </button>
                            ))}
                          </div>
                        </div>
                        <textarea
                          value={editBio}
                          onChange={(e) => setEditBio(e.target.value)}
                          placeholder="Kendinden bahset..."
                          rows={3}
                          autoFocus
                          style={{
                            width: "100%",
                            background: COLORS.bg,
                            border: `1px solid ${COLORS.accent}`,
                            borderRadius: 10,
                            padding: "8px 10px",
                            color: COLORS.text,
                            fontSize: 13,
                            resize: "none",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                            lineHeight: 1.5,
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Takip sayaçları */}
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    marginBottom: 16,
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => setSocialModal("takip edilenler")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 900,
                        color: COLORS.text,
                        fontFamily: "'DM Serif Display', serif",
                      }}
                    >
                      {followingCount}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: COLORS.textDim,
                        marginLeft: 4,
                      }}
                    >
                      Takip
                    </span>
                  </button>
                  <button
                    onClick={() => setSocialModal("takipçiler")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 900,
                        color: COLORS.text,
                        fontFamily: "'DM Serif Display', serif",
                      }}
                    >
                      {followersCount}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: COLORS.textDim,
                        marginLeft: 4,
                      }}
                    >
                      Takipçi
                    </span>
                  </button>
                </div>

                {/* Düzenle / Kaydet butonu */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 16,
                    position: "relative",
                  }}
                >
                  {!editingProfile ? (
                    <button
                      onClick={() => {
                        setEditBio(bio);
                        setEditingProfile(true);
                      }}
                      style={{
                        background: "transparent",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 10,
                        padding: "7px 16px",
                        cursor: "pointer",
                        color: COLORS.textMuted,
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "inherit",
                      }}
                    >
                      ✏️ Profili Düzenle
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setBio(editBio);
                          setClassYear(editClassYear);
                          setEditingProfile(false);
                        }}
                        style={{
                          background: COLORS.accent,
                          border: "none",
                          borderRadius: 10,
                          padding: "7px 16px",
                          cursor: "pointer",
                          color: "#0f0e17",
                          fontSize: 12,
                          fontWeight: 800,
                          fontFamily: "inherit",
                        }}
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        style={{
                          background: "transparent",
                          border: `1px solid ${COLORS.border}`,
                          borderRadius: 10,
                          padding: "7px 16px",
                          cursor: "pointer",
                          color: COLORS.textDim,
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "inherit",
                        }}
                      >
                        İptal
                      </button>
                    </>
                  )}
                </div>

                {/* İstatistikler */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: 8,
                  }}
                >
                  {[
                    { label: "Ders", value: loggedCourses.length, icon: "📚" },
                    { label: "Ort.", value: avgRating, icon: "⭐" },
                    {
                      label: "Kredi",
                      value: loggedCourses.reduce((s, c) => s + c.credits, 0),
                      icon: "🏆",
                    },
                    {
                      label: "Almak İst.",
                      value: wishlistCourses.length,
                      icon: "🔖",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        background: COLORS.bg,
                        borderRadius: 12,
                        padding: "12px 8px",
                        border: `1px solid ${COLORS.border}`,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 16, marginBottom: 2 }}>
                        {stat.icon}
                      </div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 900,
                          color: COLORS.accent,
                          fontFamily: "'DM Serif Display', serif",
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: COLORS.textDim,
                          marginTop: 3,
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logladığım Dersler */}
              <div style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      fontFamily: "'DM Serif Display', serif",
                      color: COLORS.text,
                    }}
                  >
                    📚 Logladığım Dersler
                  </div>
                  <span style={{ fontSize: 12, color: COLORS.textDim }}>
                    {loggedCourses.length} ders
                  </span>
                </div>

                {loggedCourses.length === 0 ? (
                  <div
                    style={{
                      background: COLORS.card,
                      borderRadius: 16,
                      padding: "30px 20px",
                      border: `1px solid ${COLORS.border}`,
                      textAlign: "center",
                      color: COLORS.textDim,
                      fontSize: 14,
                    }}
                  >
                    Henüz ders loglamadın.
                    <br />
                    <span style={{ color: COLORS.accent }}>Keşfet</span>{" "}
                    sekmesinden başla!
                  </div>
                ) : (
                  loggedCourses.map((course) => {
                    const entry = logs[course.id];
                    const deptColor =
                      {
                        "Bilgisayar Mühendisliği": COLORS.blue,
                        Matematik: COLORS.green,
                        Fizik: "#e05c6a",
                        "Yabancı Diller": "#a78bfa",
                      }[course.dept] || COLORS.textMuted;

                    return (
                      <div
                        key={course.id}
                        style={{
                          background: COLORS.card,
                          borderRadius: 16,
                          padding: "16px",
                          border: `1px solid ${COLORS.border}`,
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                marginBottom: 4,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 700,
                                  color: deptColor,
                                  background: deptColor + "22",
                                  borderRadius: 6,
                                  padding: "2px 7px",
                                }}
                              >
                                {course.code}
                              </span>
                              {entry.grade && (
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: COLORS.accent,
                                    background: COLORS.accent + "22",
                                    borderRadius: 6,
                                    padding: "2px 7px",
                                  }}
                                >
                                  {entry.grade}
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: COLORS.text,
                                marginBottom: 2,
                              }}
                            >
                              {course.name}
                            </div>
                            {entry.semester && (
                              <div
                                style={{ fontSize: 11, color: COLORS.textDim }}
                              >
                                {entry.semester}
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <StarRating value={entry.rating} size={14} />
                          </div>
                        </div>
                        {entry.note && (
                          <div
                            style={{
                              marginTop: 10,
                              paddingTop: 10,
                              borderTop: `1px solid ${COLORS.border}`,
                              fontSize: 13,
                              color: COLORS.textMuted,
                              fontStyle: "italic",
                            }}
                          >
                            "{entry.note}"
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Almak İstediğim Dersler */}
              <div style={{ marginTop: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      fontFamily: "'DM Serif Display', serif",
                      color: COLORS.text,
                    }}
                  >
                    🔖 Almak İstediğim Dersler
                  </div>
                  <span style={{ fontSize: 12, color: COLORS.textDim }}>
                    {wishlistCourses.length} ders
                  </span>
                </div>

                {wishlistCourses.length === 0 ? (
                  <div
                    style={{
                      background: COLORS.card,
                      borderRadius: 16,
                      padding: "30px 20px",
                      border: `1px solid ${COLORS.border}`,
                      textAlign: "center",
                      color: COLORS.textDim,
                      fontSize: 14,
                    }}
                  >
                    İzleme listen boş.
                    <br />
                    <span style={{ color: COLORS.accent }}>🔖</span> ile ders
                    ekle!
                  </div>
                ) : (
                  wishlistCourses.map((course) => {
                    const deptColor =
                      {
                        "Bilgisayar Mühendisliği": COLORS.blue,
                        Matematik: COLORS.green,
                        Fizik: "#e05c6a",
                        "Yabancı Diller": "#a78bfa",
                      }[course.dept] || COLORS.textMuted;

                    return (
                      <div
                        key={course.id}
                        style={{
                          background: COLORS.card,
                          borderRadius: 16,
                          padding: "16px",
                          border: `1px solid ${COLORS.border}`,
                          marginBottom: 10,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              marginBottom: 4,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: deptColor,
                                background: deptColor + "22",
                                borderRadius: 6,
                                padding: "2px 7px",
                              }}
                            >
                              {course.code}
                            </span>
                            <span
                              style={{ fontSize: 11, color: COLORS.textDim }}
                            >
                              {course.credits} kredi
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: COLORS.text,
                              marginBottom: 2,
                            }}
                          >
                            {course.name}
                          </div>
                          <div style={{ fontSize: 11, color: COLORS.textDim }}>
                            {course.instructor}
                          </div>
                        </div>
                        <div
                          style={{ display: "flex", gap: 8, marginLeft: 12 }}
                        >
                          <button
                            onClick={() => setLogModal(course)}
                            style={{
                              background: "transparent",
                              border: `1px solid ${COLORS.border}`,
                              borderRadius: 8,
                              padding: "6px 10px",
                              cursor: "pointer",
                              color: COLORS.textMuted,
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            + Logla
                          </button>
                          <button
                            onClick={() => toggleWishlist(course.id)}
                            style={{
                              background: COLORS.accent + "22",
                              border: `1px solid ${COLORS.accent}`,
                              borderRadius: 8,
                              padding: "6px 10px",
                              cursor: "pointer",
                              color: COLORS.accent,
                              fontSize: 14,
                            }}
                          >
                            🔖
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>

        {/* Takip / Takipçi Modalı */}
        {socialModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "#000000bb",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              zIndex: 100,
            }}
            onClick={() => setSocialModal(null)}
          >
            <div
              style={{
                background: COLORS.card,
                borderRadius: "20px 20px 0 0",
                padding: "24px 20px 40px",
                width: "100%",
                maxWidth: 480,
                border: `1px solid ${COLORS.border}`,
                animation: "slideUp 0.25s ease",
                maxHeight: "75vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: 40,
                  height: 4,
                  background: COLORS.border,
                  borderRadius: 2,
                  margin: "0 auto 20px",
                }}
              />
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  fontFamily: "'DM Serif Display', serif",
                  color: COLORS.text,
                  marginBottom: 16,
                  textTransform: "capitalize",
                }}
              >
                {socialModal === "takip edilenler"
                  ? `${followingCount} Takip Edilen`
                  : `${followersCount} Takipçi`}
              </div>

              {/* Takip edilenler listesi */}
              {socialModal === "takip edilenler" &&
                FRIENDS.filter((f) => followState[f.id]).map((friend) => (
                  <div
                    key={friend.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 0",
                      borderBottom: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <Avatar initials={friend.avatar} size={46} />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: COLORS.text,
                        }}
                      >
                        {friend.name}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.textDim }}>
                        🎓 {friend.university} · {friend.dept}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: COLORS.textDim,
                          marginTop: 1,
                        }}
                      >
                        {friend.logged.length} ders loglandı
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setFollowState((prev) => ({
                          ...prev,
                          [friend.id]: false,
                        }))
                      }
                      style={{
                        background: "transparent",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 10,
                        padding: "6px 12px",
                        cursor: "pointer",
                        color: COLORS.textMuted,
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "inherit",
                      }}
                    >
                      Takibi Bırak
                    </button>
                  </div>
                ))}

              {/* Takipçiler listesi */}
              {socialModal === "takipçiler" &&
                [
                  ...FOLLOWERS,
                  ...FRIENDS.filter((f) => followState[f.id])
                    .slice(0, 2)
                    .map((f) => ({ ...f, isFollowingBack: true })),
                ].map((person, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 0",
                      borderBottom: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <Avatar initials={person.avatar} size={46} />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: COLORS.text,
                        }}
                      >
                        {person.name}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.textDim }}>
                        🎓 {person.university} · {person.dept}
                      </div>
                    </div>
                    {followState[person.id] ? (
                      <button
                        onClick={() =>
                          setFollowState((prev) => ({
                            ...prev,
                            [person.id]: false,
                          }))
                        }
                        style={{
                          background: "transparent",
                          border: `1px solid ${COLORS.border}`,
                          borderRadius: 10,
                          padding: "6px 12px",
                          cursor: "pointer",
                          color: COLORS.textMuted,
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "inherit",
                        }}
                      >
                        Takiptesin
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setFollowState((prev) => ({
                            ...prev,
                            [person.id]: true,
                          }))
                        }
                        style={{
                          background: COLORS.accent,
                          border: "none",
                          borderRadius: 10,
                          padding: "6px 12px",
                          cursor: "pointer",
                          color: "#0f0e17",
                          fontSize: 12,
                          fontWeight: 800,
                          fontFamily: "inherit",
                        }}
                      >
                        Takip Et
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Modals */}
        {logModal && (
          <LogModal
            course={logModal}
            existing={logs[logModal.id]}
            onSave={(data) => handleSaveLog(logModal.id, data)}
            onClose={() => setLogModal(null)}
          />
        )}
        {addModal && (
          <AddCourseModal
            onAdd={(course) => {
              setCourses((prev) => [...prev, course]);
              setAddModal(false);
            }}
            onClose={() => setAddModal(false)}
          />
        )}
      </div>
      {/* ANA İÇERİK SONU */}

      {/* DESKTOP SAĞ PANEL */}
      <div className="desktop-right">
        <div style={{ position: "sticky", top: 32 }}>
          {/* Trend dersler */}
          <div
            style={{
              background: COLORS.card,
              borderRadius: 16,
              padding: "16px",
              border: `1px solid ${COLORS.border}`,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: COLORS.text,
                fontFamily: "'DM Serif Display', serif",
                marginBottom: 12,
              }}
            >
              🔥 Trend Dersler
            </div>
            {SAMPLE_COURSES.slice(0, 4).map((c, i) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: COLORS.accent,
                    width: 18,
                  }}
                >
                  #{i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: COLORS.text,
                    }}
                  >
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textDim }}>
                    {c.code}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Önerilen kullanıcılar */}
          <div
            style={{
              background: COLORS.card,
              borderRadius: 16,
              padding: "16px",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: COLORS.text,
                fontFamily: "'DM Serif Display', serif",
                marginBottom: 12,
              }}
            >
              👥 Tanıyor Olabilirsin
            </div>
            {FRIENDS.slice(0, 3).map((f) => (
              <div
                key={f.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <Avatar initials={f.avatar} size={34} />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: COLORS.text,
                    }}
                  >
                    {f.name}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textDim }}>
                    {f.university}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setFollowState((prev) => ({ ...prev, [f.id]: !prev[f.id] }))
                  }
                  style={{
                    background: followState[f.id]
                      ? "transparent"
                      : COLORS.accent,
                    border: `1px solid ${
                      followState[f.id] ? COLORS.border : COLORS.accent
                    }`,
                    borderRadius: 8,
                    padding: "4px 10px",
                    cursor: "pointer",
                    color: followState[f.id] ? COLORS.textDim : "#0f0e17",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "inherit",
                  }}
                >
                  {followState[f.id] ? "Takipte" : "Takip Et"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
