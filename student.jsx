import { useState, useEffect, useCallback } from "react";

const COLORS = {
  primary: "#4F46E5",
  primaryLight: "#EEF2FF",
  primaryDark: "#3730A3",
  success: "#16A34A",
  successLight: "#F0FDF4",
  warning: "#D97706",
  warningLight: "#FFFBEB",
  danger: "#DC2626",
  dangerLight: "#FEF2F2",
  info: "#0EA5E9",
  infoLight: "#F0F9FF",
  gray: "#6B7280",
  grayLight: "#F9FAFB",
  grayBorder: "#E5E7EB",
};

const INITIAL_DATA = {
  users: [
    {
      id: "u1",
      username: "admin",
      password: "admin123",
      role: "admin",
      name: "Dr. Admin Singh",
      email: "admin@school.edu",
    },
    {
      id: "u2",
      username: "teacher1",
      password: "teach123",
      role: "teacher",
      name: "Ms. Priya Sharma",
      email: "priya@school.edu",
      subjects: ["Mathematics", "Physics"],
    },
    {
      id: "u3",
      username: "student1",
      password: "stud123",
      role: "student",
      name: "Rahul Kumar",
      email: "rahul@school.edu",
      studentId: "S001",
      class: "10-A",
    },
    {
      id: "u4",
      username: "student2",
      password: "stud123",
      role: "student",
      name: "Anita Verma",
      email: "anita@school.edu",
      studentId: "S002",
      class: "10-A",
    },
    {
      id: "u5",
      username: "student3",
      password: "stud123",
      role: "student",
      name: "Suresh Patel",
      email: "suresh@school.edu",
      studentId: "S003",
      class: "10-B",
    },
  ],
  subjects: [
    {
      id: "sub1",
      name: "Mathematics",
      code: "MATH101",
      maxMarks: 100,
      teacherId: "u2",
    },
    {
      id: "sub2",
      name: "Physics",
      code: "PHY101",
      maxMarks: 100,
      teacherId: "u2",
    },
    {
      id: "sub3",
      name: "Chemistry",
      code: "CHEM101",
      maxMarks: 100,
      teacherId: null,
    },
    {
      id: "sub4",
      name: "English",
      code: "ENG101",
      maxMarks: 100,
      teacherId: null,
    },
    {
      id: "sub5",
      name: "Computer Science",
      code: "CS101",
      maxMarks: 100,
      teacherId: null,
    },
  ],
  grades: [
    {
      id: "g1",
      studentId: "u3",
      subjectId: "sub1",
      marks: 85,
      examType: "Final",
      date: "2024-03-15",
      teacherId: "u2",
      remarks: "Excellent",
    },
    {
      id: "g2",
      studentId: "u3",
      subjectId: "sub2",
      marks: 78,
      examType: "Final",
      date: "2024-03-16",
      teacherId: "u2",
      remarks: "Good",
    },
    {
      id: "g3",
      studentId: "u3",
      subjectId: "sub3",
      marks: 92,
      examType: "Final",
      date: "2024-03-17",
      teacherId: "u2",
      remarks: "Outstanding",
    },
    {
      id: "g4",
      studentId: "u3",
      subjectId: "sub4",
      marks: 88,
      examType: "Final",
      date: "2024-03-18",
      teacherId: "u2",
      remarks: "Very Good",
    },
    {
      id: "g5",
      studentId: "u3",
      subjectId: "sub5",
      marks: 95,
      examType: "Final",
      date: "2024-03-19",
      teacherId: "u2",
      remarks: "Outstanding",
    },
    {
      id: "g6",
      studentId: "u4",
      subjectId: "sub1",
      marks: 72,
      examType: "Final",
      date: "2024-03-15",
      teacherId: "u2",
      remarks: "Good",
    },
    {
      id: "g7",
      studentId: "u4",
      subjectId: "sub2",
      marks: 65,
      examType: "Final",
      date: "2024-03-16",
      teacherId: "u2",
      remarks: "Average",
    },
    {
      id: "g8",
      studentId: "u4",
      subjectId: "sub3",
      marks: 80,
      examType: "Final",
      date: "2024-03-17",
      teacherId: "u2",
      remarks: "Good",
    },
    {
      id: "g9",
      studentId: "u4",
      subjectId: "sub4",
      marks: 75,
      examType: "Final",
      date: "2024-03-18",
      teacherId: "u2",
      remarks: "Good",
    },
    {
      id: "g10",
      studentId: "u4",
      subjectId: "sub5",
      marks: 68,
      examType: "Final",
      date: "2024-03-19",
      teacherId: "u2",
      remarks: "Average",
    },
    {
      id: "g11",
      studentId: "u5",
      subjectId: "sub1",
      marks: 55,
      examType: "Final",
      date: "2024-03-15",
      teacherId: "u2",
      remarks: "Needs Improvement",
    },
    {
      id: "g12",
      studentId: "u5",
      subjectId: "sub2",
      marks: 60,
      examType: "Final",
      date: "2024-03-16",
      teacherId: "u2",
      remarks: "Average",
    },
    {
      id: "g13",
      studentId: "u5",
      subjectId: "sub3",
      marks: 70,
      examType: "Final",
      date: "2024-03-17",
      teacherId: "u2",
      remarks: "Good",
    },
    {
      id: "g14",
      studentId: "u5",
      subjectId: "sub4",
      marks: 58,
      examType: "Final",
      date: "2024-03-18",
      teacherId: "u2",
      remarks: "Average",
    },
    {
      id: "g15",
      studentId: "u5",
      subjectId: "sub5",
      marks: 62,
      examType: "Final",
      date: "2024-03-19",
      teacherId: "u2",
      remarks: "Average",
    },
  ],
  attendance: [
    { id: "a1", studentId: "u3", subjectId: "sub1", present: 42, total: 45 },
    { id: "a2", studentId: "u3", subjectId: "sub2", present: 40, total: 45 },
    { id: "a3", studentId: "u3", subjectId: "sub3", present: 44, total: 45 },
    { id: "a4", studentId: "u4", subjectId: "sub1", present: 38, total: 45 },
    { id: "a5", studentId: "u4", subjectId: "sub2", present: 35, total: 45 },
    { id: "a6", studentId: "u5", subjectId: "sub1", present: 30, total: 45 },
    { id: "a7", studentId: "u5", subjectId: "sub2", present: 28, total: 45 },
  ],
  settings: {
    schoolName: "Bright Future Academy",
    session: "2023-24",
    passingMarks: 35,
    gradeScale: "10",
  },
};

function calcGrade(pct) {
  if (pct >= 90) return { letter: "A+", gp: 10.0, desc: "Outstanding" };
  if (pct >= 80) return { letter: "A", gp: 9.0, desc: "Excellent" };
  if (pct >= 70) return { letter: "B+", gp: 8.0, desc: "Very Good" };
  if (pct >= 60) return { letter: "B", gp: 7.0, desc: "Good" };
  if (pct >= 50) return { letter: "C+", gp: 6.0, desc: "Above Average" };
  if (pct >= 40) return { letter: "C", gp: 5.0, desc: "Average" };
  if (pct >= 35) return { letter: "D", gp: 4.0, desc: "Pass" };
  return { letter: "F", gp: 0.0, desc: "Fail" };
}

function calcStudentStats(studentId, grades, subjects) {
  const sg = grades.filter((g) => g.studentId === studentId);
  if (!sg.length) return null;
  const total = sg.reduce((s, g) => s + g.marks, 0);
  const maxPossible = sg.length * 100;
  const pct = (total / maxPossible) * 100;
  const gpa =
    sg.reduce((s, g) => {
      const sub = subjects.find((x) => x.id === g.subjectId);
      const mp = sub ? sub.maxMarks : 100;
      return s + calcGrade((g.marks / mp) * 100).gp;
    }, 0) / sg.length;
  const marks = sg.map((g) => g.marks);
  return {
    total,
    pct: pct.toFixed(1),
    gpa: gpa.toFixed(2),
    highest: Math.max(...marks),
    lowest: Math.min(...marks),
    avg: (total / sg.length).toFixed(1),
    grade: calcGrade(pct),
    count: sg.length,
  };
}

const Badge = ({ color, children }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 500,
      background:
        color === "success"
          ? COLORS.successLight
          : color === "danger"
          ? COLORS.dangerLight
          : color === "warning"
          ? COLORS.warningLight
          : color === "info"
          ? COLORS.infoLight
          : COLORS.primaryLight,
      color:
        color === "success"
          ? COLORS.success
          : color === "danger"
          ? COLORS.danger
          : color === "warning"
          ? COLORS.warning
          : color === "info"
          ? COLORS.info
          : COLORS.primary,
    }}
  >
    {children}
  </span>
);

const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: "var(--color-background-primary)",
      border: "0.5px solid var(--color-border-tertiary)",
      borderRadius: 12,
      padding: "1rem 1.25rem",
      ...style,
    }}
  >
    {children}
  </div>
);

const StatCard = ({ label, value, color = COLORS.primary, sub }) => (
  <div
    style={{
      background: "var(--color-background-secondary)",
      borderRadius: 8,
      padding: "1rem",
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: 13,
        color: "var(--color-text-secondary)",
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 24, fontWeight: 500, color }}>{value}</div>
    {sub && (
      <div
        style={{
          fontSize: 12,
          color: "var(--color-text-secondary)",
          marginTop: 2,
        }}
      >
        {sub}
      </div>
    )}
  </div>
);

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 12 }}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: 13,
          color: "var(--color-text-secondary)",
          marginBottom: 4,
        }}
      >
        {label}
      </label>
    )}
    <input
      {...props}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "8px 10px",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: 8,
        fontSize: 14,
        background: "var(--color-background-primary)",
        color: "var(--color-text-primary)",
        ...props.style,
      }}
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div style={{ marginBottom: 12 }}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: 13,
          color: "var(--color-text-secondary)",
          marginBottom: 4,
        }}
      >
        {label}
      </label>
    )}
    <select
      {...props}
      style={{
        width: "100%",
        padding: "8px 10px",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: 8,
        fontSize: 14,
        background: "var(--color-background-primary)",
        color: "var(--color-text-primary)",
        ...props.style,
      }}
    >
      {children}
    </select>
  </div>
);

const Btn = ({
  children,
  onClick,
  color = "primary",
  size = "md",
  style = {},
  disabled,
}) => {
  const bg =
    color === "primary"
      ? COLORS.primary
      : color === "danger"
      ? COLORS.danger
      : color === "success"
      ? COLORS.success
      : color === "warning"
      ? COLORS.warning
      : "transparent";
  const fg = ["primary", "danger", "success", "warning"].includes(color)
    ? "#fff"
    : "var(--color-text-primary)";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: bg,
        color: fg,
        border:
          color === "ghost"
            ? "0.5px solid var(--color-border-secondary)"
            : "none",
        borderRadius: 8,
        padding: size === "sm" ? "4px 10px" : "8px 16px",
        fontSize: size === "sm" ? 12 : 14,
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "var(--color-background-primary)",
        borderRadius: 12,
        padding: "1.5rem",
        width: "min(500px, 90vw)",
        maxHeight: "85vh",
        overflowY: "auto",
        border: "0.5px solid var(--color-border-tertiary)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{title}</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "var(--color-text-secondary)",
          }}
        >
          ×
        </button>
      </div>
      {children}
    </div>
  </div>
);

function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [selectedDemo, setSelectedDemo] = useState(null);

  const demos = [
    {
      label: "Admin",
      username: "admin",
      password: "admin123",
      color: COLORS.primary,
    },
    {
      label: "Teacher",
      username: "teacher1",
      password: "teach123",
      color: COLORS.success,
    },
    {
      label: "Student",
      username: "student1",
      password: "stud123",
      color: COLORS.info,
    },
  ];

  const handleLogin = () => {
    const user = INITIAL_DATA.users.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (user) onLogin(user);
    else setErr("Invalid username or password");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-background-tertiary)",
      }}
    >
      <div style={{ width: "min(420px, 92vw)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎓</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>
            Student Grade Tracker
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              color: "var(--color-text-secondary)",
              fontSize: 14,
            }}
          >
            {INITIAL_DATA.settings.schoolName}
          </p>
        </div>
        <Card>
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => {
              setForm((f) => ({ ...f, username: e.target.value }));
              setErr("");
            }}
            placeholder="Enter username"
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm((f) => ({ ...f, password: e.target.value }));
              setErr("");
            }}
            placeholder="Enter password"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {err && (
            <div
              style={{ color: COLORS.danger, fontSize: 13, marginBottom: 8 }}
            >
              {err}
            </div>
          )}
          <Btn onClick={handleLogin} style={{ width: "100%", marginTop: 4 }}>
            Sign In
          </Btn>
          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: "0.5px solid var(--color-border-tertiary)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                textAlign: "center",
                margin: "0 0 8px",
              }}
            >
              Quick login demo accounts
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {demos.map((d) => (
                <button
                  key={d.label}
                  onClick={() => {
                    setForm({ username: d.username, password: d.password });
                    setSelectedDemo(d.label);
                  }}
                  style={{
                    padding: "8px 4px",
                    border: `1.5px solid ${
                      selectedDemo === d.label ? d.color : COLORS.grayBorder
                    }`,
                    borderRadius: 8,
                    background:
                      selectedDemo === d.label ? d.color + "15" : "transparent",
                    cursor: "pointer",
                    fontSize: 13,
                    color: d.color,
                    fontWeight: 500,
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Sidebar({ user, active, setActive, onLogout }) {
  const adminNav = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "students", icon: "👥", label: "Students" },
    { id: "teachers", icon: "👩‍🏫", label: "Teachers" },
    { id: "subjects", icon: "📚", label: "Subjects" },
    { id: "grades", icon: "📊", label: "All Grades" },
    { id: "attendance", icon: "📅", label: "Attendance" },
    { id: "reports", icon: "📄", label: "Reports" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];
  const teacherNav = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "grades", icon: "📊", label: "Enter Marks" },
    { id: "attendance", icon: "📅", label: "Attendance" },
    { id: "reports", icon: "📄", label: "Reports" },
  ];
  const studentNav = [
    { id: "dashboard", icon: "⊞", label: "My Dashboard" },
    { id: "grades", icon: "📊", label: "My Grades" },
    { id: "attendance", icon: "📅", label: "Attendance" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "reports", icon: "📄", label: "Report Card" },
  ];
  const nav =
    user.role === "admin"
      ? adminNav
      : user.role === "teacher"
      ? teacherNav
      : studentNav;
  const roleColor =
    user.role === "admin"
      ? COLORS.primary
      : user.role === "teacher"
      ? COLORS.success
      : COLORS.info;

  return (
    <div
      style={{
        width: 220,
        background: "var(--color-background-primary)",
        borderRight: "0.5px solid var(--color-border-tertiary)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: "16px 16px 8px" }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "var(--color-text-primary)",
            marginBottom: 2,
          }}
        >
          🎓 GradeTracker
        </div>
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
          {INITIAL_DATA.settings.schoolName}
        </div>
      </div>
      <div
        style={{
          margin: "8px 12px 12px",
          padding: "10px 12px",
          background: roleColor + "15",
          borderRadius: 8,
          border: `0.5px solid ${roleColor}30`,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-text-primary)",
          }}
        >
          {user.name}
        </div>
        <div
          style={{
            fontSize: 11,
            color: roleColor,
            fontWeight: 500,
            marginTop: 2,
            textTransform: "capitalize",
          }}
        >
          {user.role}
        </div>
        {user.studentId && (
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
            ID: {user.studentId}
          </div>
        )}
      </div>
      <nav style={{ flex: 1, padding: "0 8px" }}>
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "9px 10px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: active === item.id ? 500 : 400,
              background: active === item.id ? roleColor + "15" : "transparent",
              color:
                active === item.id ? roleColor : "var(--color-text-secondary)",
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: "12px 8px 16px" }}>
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: "9px 10px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            background: "transparent",
            color: "var(--color-text-secondary)",
          }}
        >
          <span>🚪</span>Sign Out
        </button>
      </div>
    </div>
  );
}

function AdminDashboard({ data }) {
  const students = data.users.filter((u) => u.role === "student");
  const teachers = data.users.filter((u) => u.role === "teacher");
  const allStats = students
    .map((s) => calcStudentStats(s.id, data.grades, data.subjects))
    .filter(Boolean);
  const avgPct = allStats.length
    ? (
        allStats.reduce((a, b) => a + parseFloat(b.pct), 0) / allStats.length
      ).toFixed(1)
    : "N/A";
  const passing = allStats.filter((s) => parseFloat(s.pct) >= 35).length;
  const topStudent = students.reduce((top, s) => {
    const st = calcStudentStats(s.id, data.grades, data.subjects);
    if (!st) return top;
    if (!top.st || parseFloat(st.pct) > parseFloat(top.st.pct))
      return { s, st };
    return top;
  }, {});

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 20px" }}>
        Dashboard Overview
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <StatCard label="Total Students" value={students.length} />
        <StatCard label="Total Teachers" value={teachers.length} />
        <StatCard
          label="Class Average"
          value={`${avgPct}%`}
          color={COLORS.success}
        />
        <StatCard
          label="Passing Students"
          value={`${passing}/${students.length}`}
          color={COLORS.info}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>
            Student Performance Summary
          </h3>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "0.5px solid var(--color-border-tertiary)",
                }}
              >
                <th
                  style={{
                    textAlign: "left",
                    padding: "6px 8px",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Student
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "6px 8px",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Avg%
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "6px 8px",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  GPA
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "6px 8px",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const st = calcStudentStats(s.id, data.grades, data.subjects);
                if (!st) return null;
                const g = st.grade;
                return (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: "0.5px solid var(--color-border-tertiary)",
                    }}
                  >
                    <td style={{ padding: "8px", fontWeight: 500 }}>
                      {s.name}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {st.pct}%
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {st.gpa}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      <Badge
                        color={
                          g.gp >= 7
                            ? "success"
                            : g.gp >= 5
                            ? "warning"
                            : "danger"
                        }
                      >
                        {g.letter}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <Card>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>
            Subject-wise Analysis
          </h3>
          {data.subjects.map((sub) => {
            const subGrades = data.grades.filter((g) => g.subjectId === sub.id);
            if (!subGrades.length) return null;
            const avg =
              subGrades.reduce((a, g) => a + g.marks, 0) / subGrades.length;
            const pct = (avg / sub.maxMarks) * 100;
            return (
              <div key={sub.id} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 13 }}>{sub.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>
                    {avg.toFixed(1)}/{sub.maxMarks}
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "var(--color-background-secondary)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background:
                        pct >= 70
                          ? COLORS.success
                          : pct >= 50
                          ? COLORS.warning
                          : COLORS.danger,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            );
          })}
          {topStudent.s && (
            <div
              style={{
                marginTop: 16,
                padding: "10px 12px",
                background: COLORS.successLight,
                borderRadius: 8,
                border: `0.5px solid ${COLORS.success}30`,
              }}
            >
              <div
                style={{ fontSize: 12, color: COLORS.success, fontWeight: 500 }}
              >
                Top Performer
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>
                {topStudent.s.name} — {topStudent.st?.pct}%
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function StudentsPage({ data, setData }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const students = data.users
    .filter((u) => u.role === "student")
    .filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.studentId || "").includes(search)
    );

  const openAdd = () => {
    setForm({
      name: "",
      username: "",
      password: "stud123",
      email: "",
      studentId: "",
      class: "",
    });
    setModal("add");
  };
  const openEdit = (s) => {
    setForm({ ...s });
    setModal("edit");
  };
  const save = () => {
    if (!form.name || !form.username) return;
    if (modal === "add") {
      setData((d) => ({
        ...d,
        users: [...d.users, { ...form, id: "u" + Date.now(), role: "student" }],
      }));
    } else {
      setData((d) => ({
        ...d,
        users: d.users.map((u) => (u.id === form.id ? form : u)),
      }));
    }
    setModal(null);
  };
  const del = (id) => {
    if (window.confirm("Delete this student?"))
      setData((d) => ({
        ...d,
        users: d.users.filter((u) => u.id !== id),
        grades: d.grades.filter((g) => g.studentId !== id),
      }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>
          Students ({students.length})
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "7px 12px",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 8,
              fontSize: 13,
              background: "var(--color-background-primary)",
              color: "var(--color-text-primary)",
            }}
          />
          <Btn onClick={openAdd}>+ Add Student</Btn>
        </div>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              {[
                "ID",
                "Name",
                "Class",
                "Email",
                "Average",
                "Grade",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    borderBottom: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const st = calcStudentStats(s.id, data.grades, data.subjects);
              const g = st ? st.grade : null;
              return (
                <tr
                  key={s.id}
                  style={{
                    borderBottom: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      fontWeight: 500,
                      color: COLORS.primary,
                    }}
                  >
                    {s.studentId || "—"}
                  </td>
                  <td style={{ padding: "10px 12px" }}>{s.name}</td>
                  <td style={{ padding: "10px 12px" }}>{s.class || "—"}</td>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {s.email}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    {st ? `${st.pct}%` : "—"}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    {g ? (
                      <Badge
                        color={
                          g.gp >= 7
                            ? "success"
                            : g.gp >= 5
                            ? "warning"
                            : "danger"
                        }
                      >
                        {g.letter}
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Btn size="sm" color="ghost" onClick={() => openEdit(s)}>
                        Edit
                      </Btn>
                      <Btn size="sm" color="danger" onClick={() => del(s.id)}>
                        Del
                      </Btn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!students.length && (
          <div
            style={{
              padding: 24,
              textAlign: "center",
              color: "var(--color-text-secondary)",
            }}
          >
            No students found
          </div>
        )}
      </Card>
      {modal && (
        <Modal
          title={modal === "add" ? "Add Student" : "Edit Student"}
          onClose={() => setModal(null)}
        >
          <Input
            label="Full Name"
            value={form.name || ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Student ID"
            value={form.studentId || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, studentId: e.target.value }))
            }
          />
          <Input
            label="Class/Section"
            value={form.class || ""}
            onChange={(e) => setForm((f) => ({ ...f, class: e.target.value }))}
          />
          <Input
            label="Username"
            value={form.username || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
          />
          <Input
            label="Password"
            value={form.password || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />
          <Input
            label="Email"
            value={form.email || ""}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Btn color="ghost" onClick={() => setModal(null)}>
              Cancel
            </Btn>
            <Btn onClick={save}>
              {modal === "add" ? "Add Student" : "Save Changes"}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function TeachersPage({ data, setData }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const teachers = data.users.filter((u) => u.role === "teacher");

  const openAdd = () => {
    setForm({
      name: "",
      username: "",
      password: "teach123",
      email: "",
      subjects: [],
    });
    setModal("add");
  };
  const save = () => {
    if (!form.name || !form.username) return;
    if (modal === "add")
      setData((d) => ({
        ...d,
        users: [...d.users, { ...form, id: "u" + Date.now(), role: "teacher" }],
      }));
    else
      setData((d) => ({
        ...d,
        users: d.users.map((u) => (u.id === form.id ? form : u)),
      }));
    setModal(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>
          Teachers ({teachers.length})
        </h2>
        <Btn onClick={openAdd}>+ Add Teacher</Btn>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {teachers.map((t) => {
          const tSubs = data.subjects.filter((s) => s.teacherId === t.id);
          const studCount = new Set(
            data.grades
              .filter((g) => tSubs.some((s) => s.id === g.subjectId))
              .map((g) => g.studentId)
          ).size;
          return (
            <Card key={t.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: COLORS.successLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 500,
                    color: COLORS.success,
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{t.name}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {t.email}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--color-text-secondary)",
                  marginBottom: 6,
                }}
              >
                Subjects:{" "}
                {tSubs.map((s) => s.name).join(", ") || "None assigned"}
              </div>
              <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
                <span style={{ color: "var(--color-text-secondary)" }}>
                  Students taught: <strong>{studCount}</strong>
                </span>
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                <Btn
                  size="sm"
                  color="ghost"
                  onClick={() => {
                    setForm({ ...t });
                    setModal("edit");
                  }}
                >
                  Edit
                </Btn>
              </div>
            </Card>
          );
        })}
      </div>
      {modal && (
        <Modal
          title={modal === "add" ? "Add Teacher" : "Edit Teacher"}
          onClose={() => setModal(null)}
        >
          <Input
            label="Full Name"
            value={form.name || ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Username"
            value={form.username || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
          />
          <Input
            label="Password"
            value={form.password || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />
          <Input
            label="Email"
            value={form.email || ""}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Btn color="ghost" onClick={() => setModal(null)}>
              Cancel
            </Btn>
            <Btn onClick={save}>{modal === "add" ? "Add Teacher" : "Save"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SubjectsPage({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const save = () => {
    if (!form.name) return;
    if (form.id)
      setData((d) => ({
        ...d,
        subjects: d.subjects.map((s) => (s.id === form.id ? form : s)),
      }));
    else
      setData((d) => ({
        ...d,
        subjects: [...d.subjects, { ...form, id: "sub" + Date.now() }],
      }));
    setModal(false);
  };
  const del = (id) => {
    if (window.confirm("Delete subject?"))
      setData((d) => ({
        ...d,
        subjects: d.subjects.filter((s) => s.id !== id),
      }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>
          Subjects ({data.subjects.length})
        </h2>
        <Btn
          onClick={() => {
            setForm({ name: "", code: "", maxMarks: 100, teacherId: "" });
            setModal(true);
          }}
        >
          + Add Subject
        </Btn>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {data.subjects.map((sub) => {
          const teacher = data.users.find((u) => u.id === sub.teacherId);
          const gradeCount = data.grades.filter(
            (g) => g.subjectId === sub.id
          ).length;
          const avg = gradeCount
            ? (
                data.grades
                  .filter((g) => g.subjectId === sub.id)
                  .reduce((a, g) => a + g.marks, 0) / gradeCount
              ).toFixed(1)
            : null;
          return (
            <Card key={sub.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>
                    {sub.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {sub.code} · Max: {sub.maxMarks}
                  </div>
                </div>
                <Badge color="info">{gradeCount} marks</Badge>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--color-text-secondary)",
                  marginBottom: 10,
                }}
              >
                Teacher: {teacher ? teacher.name : "Unassigned"}
                <br />
                {avg && `Class avg: ${avg}`}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Btn
                  size="sm"
                  color="ghost"
                  onClick={() => {
                    setForm({ ...sub });
                    setModal(true);
                  }}
                >
                  Edit
                </Btn>
                <Btn size="sm" color="danger" onClick={() => del(sub.id)}>
                  Delete
                </Btn>
              </div>
            </Card>
          );
        })}
      </div>
      {modal && (
        <Modal
          title={form.id ? "Edit Subject" : "Add Subject"}
          onClose={() => setModal(false)}
        >
          <Input
            label="Subject Name"
            value={form.name || ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Subject Code"
            value={form.code || ""}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
          />
          <Input
            label="Maximum Marks"
            type="number"
            value={form.maxMarks || 100}
            onChange={(e) =>
              setForm((f) => ({ ...f, maxMarks: parseInt(e.target.value) }))
            }
          />
          <Select
            label="Assign Teacher"
            value={form.teacherId || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, teacherId: e.target.value }))
            }
          >
            <option value="">Unassigned</option>
            {data.users
              .filter((u) => u.role === "teacher")
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
          </Select>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Btn color="ghost" onClick={() => setModal(false)}>
              Cancel
            </Btn>
            <Btn onClick={save}>Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function GradesPage({ data, setData, user }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const [filterStudent, setFilterStudent] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const students = data.users.filter((u) => u.role === "student");
  const isTeacher = user.role === "teacher";
  const isStudent = user.role === "student";

  let grades = data.grades;
  if (isStudent) grades = grades.filter((g) => g.studentId === user.id);
  if (filterStudent)
    grades = grades.filter((g) => g.studentId === filterStudent);
  if (filterSubject)
    grades = grades.filter((g) => g.subjectId === filterSubject);

  const save = () => {
    if (!form.studentId || !form.subjectId || form.marks === undefined) return;
    const sub = data.subjects.find((s) => s.id === form.subjectId);
    if (parseFloat(form.marks) > (sub?.maxMarks || 100)) {
      alert("Marks exceed maximum!");
      return;
    }
    if (form.id) {
      setData((d) => ({
        ...d,
        grades: d.grades.map((g) =>
          g.id === form.id ? { ...form, marks: parseFloat(form.marks) } : g
        ),
      }));
    } else {
      setData((d) => ({
        ...d,
        grades: [
          ...d.grades,
          {
            ...form,
            id: "g" + Date.now(),
            marks: parseFloat(form.marks),
            teacherId: user.id,
            date: new Date().toISOString().split("T")[0],
          },
        ],
      }));
    }
    setModal(false);
  };
  const del = (id) => {
    if (window.confirm("Delete this grade record?"))
      setData((d) => ({ ...d, grades: d.grades.filter((g) => g.id !== id) }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>
          {isStudent ? "My Grades" : "Grade Management"}
        </h2>
        {!isStudent && (
          <Btn
            onClick={() => {
              setForm({
                studentId: "",
                subjectId: "",
                marks: "",
                examType: "Final",
                remarks: "",
              });
              setModal(true);
            }}
          >
            + Enter Marks
          </Btn>
        )}
      </div>
      {!isStudent && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <Select
            value={filterStudent}
            onChange={(e) => setFilterStudent(e.target.value)}
            style={{ margin: 0, width: "auto" }}
          >
            <option value="">All Students</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <Select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            style={{ margin: 0, width: "auto" }}
          >
            <option value="">All Subjects</option>
            {data.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </div>
      )}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              {(!isStudent
                ? [
                    "Student",
                    "Subject",
                    "Marks",
                    "Max",
                    "%",
                    "Grade",
                    "Exam",
                    "Date",
                    "Remarks",
                    "Actions",
                  ]
                : ["Subject", "Marks", "Max", "%", "Grade", "Exam", "Remarks"]
              ).map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    borderBottom: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => {
              const student = data.users.find((u) => u.id === g.studentId);
              const sub = data.subjects.find((s) => s.id === g.subjectId);
              const pct = sub
                ? ((g.marks / sub.maxMarks) * 100).toFixed(1)
                : "—";
              const grade = sub
                ? calcGrade((g.marks / sub.maxMarks) * 100)
                : null;
              return (
                <tr
                  key={g.id}
                  style={{
                    borderBottom: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  {!isStudent && (
                    <td style={{ padding: "9px 12px" }}>
                      {student?.name || "—"}
                    </td>
                  )}
                  <td style={{ padding: "9px 12px" }}>{sub?.name || "—"}</td>
                  <td style={{ padding: "9px 12px", fontWeight: 500 }}>
                    {g.marks}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {sub?.maxMarks || 100}
                  </td>
                  <td style={{ padding: "9px 12px" }}>{pct}%</td>
                  <td style={{ padding: "9px 12px" }}>
                    {grade ? (
                      <Badge
                        color={
                          grade.gp >= 7
                            ? "success"
                            : grade.gp >= 5
                            ? "warning"
                            : "danger"
                        }
                      >
                        {grade.letter}
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td style={{ padding: "9px 12px" }}>
                    <Badge color="info">{g.examType}</Badge>
                  </td>
                  {!isStudent && (
                    <td
                      style={{
                        padding: "9px 12px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {g.date}
                    </td>
                  )}
                  <td
                    style={{
                      padding: "9px 12px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {g.remarks || "—"}
                  </td>
                  {!isStudent && (
                    <td style={{ padding: "9px 12px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        <Btn
                          size="sm"
                          color="ghost"
                          onClick={() => {
                            setForm({ ...g });
                            setModal(true);
                          }}
                        >
                          Edit
                        </Btn>
                        <Btn size="sm" color="danger" onClick={() => del(g.id)}>
                          Del
                        </Btn>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {!grades.length && (
          <div
            style={{
              padding: 24,
              textAlign: "center",
              color: "var(--color-text-secondary)",
            }}
          >
            No grade records found
          </div>
        )}
      </Card>
      {modal && (
        <Modal
          title={form.id ? "Edit Grade" : "Enter Marks"}
          onClose={() => setModal(false)}
        >
          <Select
            label="Student"
            value={form.studentId}
            onChange={(e) =>
              setForm((f) => ({ ...f, studentId: e.target.value }))
            }
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <Select
            label="Subject"
            value={form.subjectId}
            onChange={(e) =>
              setForm((f) => ({ ...f, subjectId: e.target.value }))
            }
          >
            <option value="">Select Subject</option>
            {data.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} (Max: {s.maxMarks})
              </option>
            ))}
          </Select>
          <Input
            label="Marks Obtained"
            type="number"
            value={form.marks || ""}
            onChange={(e) => setForm((f) => ({ ...f, marks: e.target.value }))}
          />
          <Select
            label="Exam Type"
            value={form.examType || "Final"}
            onChange={(e) =>
              setForm((f) => ({ ...f, examType: e.target.value }))
            }
          >
            {["Unit Test", "Midterm", "Final", "Assignment", "Practical"].map(
              (t) => (
                <option key={t}>{t}</option>
              )
            )}
          </Select>
          <Input
            label="Remarks"
            value={form.remarks || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, remarks: e.target.value }))
            }
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Btn color="ghost" onClick={() => setModal(false)}>
              Cancel
            </Btn>
            <Btn onClick={save}>Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function AttendancePage({ data, setData, user }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const isStudent = user.role === "student";
  let attendance = isStudent
    ? data.attendance.filter((a) => a.studentId === user.id)
    : data.attendance;

  const save = () => {
    if (!form.studentId || !form.subjectId) return;
    if (form.id)
      setData((d) => ({
        ...d,
        attendance: d.attendance.map((a) =>
          a.id === form.id
            ? {
                ...form,
                present: parseInt(form.present),
                total: parseInt(form.total),
              }
            : a
        ),
      }));
    else
      setData((d) => ({
        ...d,
        attendance: [
          ...d.attendance,
          {
            ...form,
            id: "a" + Date.now(),
            present: parseInt(form.present),
            total: parseInt(form.total),
          },
        ],
      }));
    setModal(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>
          Attendance Tracking
        </h2>
        {!isStudent && (
          <Btn
            onClick={() => {
              setForm({ studentId: "", subjectId: "", present: "", total: "" });
              setModal(true);
            }}
          >
            + Add Record
          </Btn>
        )}
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              {(!isStudent
                ? [
                    "Student",
                    "Subject",
                    "Present",
                    "Total",
                    "Percentage",
                    "Status",
                    "Actions",
                  ]
                : ["Subject", "Present", "Total", "Percentage", "Status"]
              ).map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    borderBottom: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => {
              const student = data.users.find((u) => u.id === a.studentId);
              const sub = data.subjects.find((s) => s.id === a.subjectId);
              const pct = ((a.present / a.total) * 100).toFixed(1);
              const ok = parseFloat(pct) >= 75;
              return (
                <tr
                  key={a.id}
                  style={{
                    borderBottom: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  {!isStudent && (
                    <td style={{ padding: "9px 12px" }}>
                      {student?.name || "—"}
                    </td>
                  )}
                  <td style={{ padding: "9px 12px" }}>{sub?.name || "—"}</td>
                  <td style={{ padding: "9px 12px" }}>{a.present}</td>
                  <td style={{ padding: "9px 12px" }}>{a.total}</td>
                  <td style={{ padding: "9px 12px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 60,
                          height: 6,
                          background: "var(--color-background-secondary)",
                          borderRadius: 3,
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: ok ? COLORS.success : COLORS.danger,
                            borderRadius: 3,
                          }}
                        />
                      </div>
                      {pct}%
                    </div>
                  </td>
                  <td style={{ padding: "9px 12px" }}>
                    <Badge color={ok ? "success" : "danger"}>
                      {ok ? "Regular" : "Low"}
                    </Badge>
                  </td>
                  {!isStudent && (
                    <td style={{ padding: "9px 12px" }}>
                      <Btn
                        size="sm"
                        color="ghost"
                        onClick={() => {
                          setForm({ ...a });
                          setModal(true);
                        }}
                      >
                        Edit
                      </Btn>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {!attendance.length && (
          <div
            style={{
              padding: 24,
              textAlign: "center",
              color: "var(--color-text-secondary)",
            }}
          >
            No attendance records
          </div>
        )}
      </Card>
      {modal && (
        <Modal title="Attendance Record" onClose={() => setModal(false)}>
          <Select
            label="Student"
            value={form.studentId}
            onChange={(e) =>
              setForm((f) => ({ ...f, studentId: e.target.value }))
            }
          >
            <option value="">Select Student</option>
            {data.users
              .filter((u) => u.role === "student")
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </Select>
          <Select
            label="Subject"
            value={form.subjectId}
            onChange={(e) =>
              setForm((f) => ({ ...f, subjectId: e.target.value }))
            }
          >
            <option value="">Select Subject</option>
            {data.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <Input
            label="Classes Present"
            type="number"
            value={form.present || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, present: e.target.value }))
            }
          />
          <Input
            label="Total Classes"
            type="number"
            value={form.total || ""}
            onChange={(e) => setForm((f) => ({ ...f, total: e.target.value }))}
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Btn color="ghost" onClick={() => setModal(false)}>
              Cancel
            </Btn>
            <Btn onClick={save}>Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function AnalyticsPage({ data, user }) {
  const grades = data.grades.filter((g) => g.studentId === user.id);
  const st = calcStudentStats(user.id, data.grades, data.subjects);
  if (!st)
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "var(--color-text-secondary)",
        }}
      >
        No data available yet.
      </div>
    );

  const suggestions = [];
  grades.forEach((g) => {
    const sub = data.subjects.find((s) => s.id === g.subjectId);
    const pct = sub ? (g.marks / sub.maxMarks) * 100 : 0;
    if (pct < 50)
      suggestions.push({
        type: "danger",
        sub: sub?.name,
        msg: `Needs significant improvement in ${sub?.name}. Consider extra practice and tutoring.`,
      });
    else if (pct < 70)
      suggestions.push({
        type: "warning",
        sub: sub?.name,
        msg: `Room for improvement in ${sub?.name}. Review core concepts and practice regularly.`,
      });
    else if (pct >= 90)
      suggestions.push({
        type: "success",
        sub: sub?.name,
        msg: `Excellent performance in ${sub?.name}! Keep up the great work.`,
      });
  });

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 20px" }}>
        Performance Analytics
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <StatCard
          label="Overall %"
          value={`${st.pct}%`}
          color={COLORS.primary}
        />
        <StatCard label="GPA" value={st.gpa} color={COLORS.success} />
        <StatCard
          label="Highest Marks"
          value={st.highest}
          color={COLORS.info}
        />
        <StatCard
          label="Lowest Marks"
          value={st.lowest}
          color={parseFloat(st.lowest) < 40 ? COLORS.danger : COLORS.warning}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>
            Subject-wise Performance
          </h3>
          {grades.map((g) => {
            const sub = data.subjects.find((s) => s.id === g.subjectId);
            if (!sub) return null;
            const pct = (g.marks / sub.maxMarks) * 100;
            const gr = calcGrade(pct);
            return (
              <div key={g.id} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 13 }}>{sub.name}</span>
                  <span style={{ fontSize: 13 }}>
                    <strong>{g.marks}</strong>/{sub.maxMarks} —{" "}
                    <Badge
                      color={
                        gr.gp >= 7
                          ? "success"
                          : gr.gp >= 5
                          ? "warning"
                          : "danger"
                      }
                    >
                      {gr.letter}
                    </Badge>
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "var(--color-background-secondary)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background:
                        pct >= 70
                          ? COLORS.success
                          : pct >= 50
                          ? COLORS.warning
                          : COLORS.danger,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Card>
        <Card>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>
            Grade Summary
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                padding: "12px",
                background: "var(--color-background-secondary)",
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 28, fontWeight: 500, color: COLORS.primary }}
              >
                {st.grade.letter}
              </div>
              <div
                style={{ fontSize: 12, color: "var(--color-text-secondary)" }}
              >
                {st.grade.desc}
              </div>
            </div>
            <div
              style={{
                padding: "12px",
                background: "var(--color-background-secondary)",
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 28, fontWeight: 500, color: COLORS.success }}
              >
                {st.gpa}
              </div>
              <div
                style={{ fontSize: 12, color: "var(--color-text-secondary)" }}
              >
                GPA (out of 10)
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              borderTop: "0.5px solid var(--color-border-tertiary)",
              paddingTop: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
              }}
            >
              <span style={{ color: "var(--color-text-secondary)" }}>
                Total Marks
              </span>
              <strong>
                {st.total}/{grades.length * 100}
              </strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
              }}
            >
              <span style={{ color: "var(--color-text-secondary)" }}>
                Average per Subject
              </span>
              <strong>{st.avg}</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
              }}
            >
              <span style={{ color: "var(--color-text-secondary)" }}>
                Subjects Appeared
              </span>
              <strong>{st.count}</strong>
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>
          Personalized Suggestions
        </h3>
        {suggestions.length ? (
          suggestions.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                marginBottom: 8,
                background:
                  s.type === "danger"
                    ? COLORS.dangerLight
                    : s.type === "warning"
                    ? COLORS.warningLight
                    : COLORS.successLight,
                border: `0.5px solid ${
                  s.type === "danger"
                    ? COLORS.danger
                    : s.type === "warning"
                    ? COLORS.warning
                    : COLORS.success
                }30`,
              }}
            >
              <span style={{ fontSize: 14 }}>
                {s.type === "danger"
                  ? "⚠️"
                  : s.type === "warning"
                  ? "💡"
                  : "✅"}
              </span>
              <span style={{ fontSize: 13 }}>{s.msg}</span>
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "12px",
              background: COLORS.successLight,
              borderRadius: 8,
              fontSize: 13,
              color: COLORS.success,
            }}
          >
            ✅ Great performance across all subjects! Keep maintaining your
            study consistency.
          </div>
        )}
      </Card>
    </div>
  );
}

function ReportCard({ data, user }) {
  const [selectedStudent, setSelectedStudent] = useState(
    user.role === "student" ? user.id : ""
  );
  const students = data.users.filter((u) => u.role === "student");
  const student = data.users.find((u) => u.id === selectedStudent);
  const grades = data.grades.filter((g) => g.studentId === selectedStudent);
  const st = selectedStudent
    ? calcStudentStats(selectedStudent, data.grades, data.subjects)
    : null;
  const attendance = data.attendance.filter(
    (a) => a.studentId === selectedStudent
  );
  const avgAttendance = attendance.length
    ? (
        attendance.reduce((s, a) => s + (a.present / a.total) * 100, 0) /
        attendance.length
      ).toFixed(1)
    : null;

  const printReport = () => {
    const printContent = document.getElementById("report-card-content");
    const win = window.open("", "_blank");
    win.document.write(`<html><head><title>Report Card</title><style>
      body{font-family:Arial,sans-serif;padding:20px;color:#000}
      table{width:100%;border-collapse:collapse}
      th,td{border:1px solid #ccc;padding:8px;text-align:left}
      th{background:#f0f0f0;font-weight:600}
      h1{color:#333} .header{text-align:center;border-bottom:2px solid #333;padding-bottom:12px;margin-bottom:16px}
      .grade-badge{display:inline-block;padding:2px 8px;border-radius:4px;font-weight:bold}
      .pass{background:#dcfce7;color:#166534} .fail{background:#fee2e2;color:#991b1b}
      .stats{display:flex;gap:12px;margin:12px 0}
      .stat{padding:8px 12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:4px;text-align:center}
      .stat .val{font-size:20px;font-weight:bold} .stat .lbl{font-size:11px;color:#6b7280}
    </style></head><body>`);
    win.document.write(printContent.innerHTML);
    win.document.write(`</body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>
          Report Card Generation
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          {user.role !== "student" && (
            <Select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              style={{ margin: 0, width: 200 }}
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
          )}
          {student && st && (
            <Btn onClick={printReport}>🖨️ Print / Save PDF</Btn>
          )}
        </div>
      </div>
      {student && st ? (
        <Card>
          <div id="report-card-content">
            <div
              style={{
                textAlign: "center",
                borderBottom: "2px solid var(--color-border-tertiary)",
                paddingBottom: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 500 }}>
                🎓 {data.settings.schoolName}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  marginTop: 4,
                }}
              >
                Academic Session: {data.settings.session}
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, marginTop: 8 }}>
                STUDENT REPORT CARD
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
                fontSize: 13,
              }}
            >
              <div>
                <div>
                  <strong>Name:</strong> {student.name}
                </div>
                <div style={{ marginTop: 4 }}>
                  <strong>Student ID:</strong> {student.studentId || "—"}
                </div>
                <div style={{ marginTop: 4 }}>
                  <strong>Class:</strong> {student.class || "—"}
                </div>
              </div>
              <div>
                <div>
                  <strong>Email:</strong> {student.email}
                </div>
                <div style={{ marginTop: 4 }}>
                  <strong>Avg Attendance:</strong>{" "}
                  {avgAttendance ? `${avgAttendance}%` : "—"}
                </div>
                <div style={{ marginTop: 4 }}>
                  <strong>Report Date:</strong>{" "}
                  {new Date().toLocaleDateString("en-IN")}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <StatCard
                label="Percentage"
                value={`${st.pct}%`}
                color={COLORS.primary}
              />
              <StatCard
                label="GPA"
                value={`${st.gpa}/10`}
                color={COLORS.success}
              />
              <StatCard
                label="Grade"
                value={st.grade.letter}
                color={
                  parseFloat(st.gpa) >= 7
                    ? COLORS.success
                    : parseFloat(st.gpa) >= 5
                    ? COLORS.warning
                    : COLORS.danger
                }
              />
              <StatCard
                label="Result"
                value={parseFloat(st.pct) >= 35 ? "PASS" : "FAIL"}
                color={
                  parseFloat(st.pct) >= 35 ? COLORS.success : COLORS.danger
                }
              />
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
                marginBottom: 16,
              }}
            >
              <thead>
                <tr style={{ background: "var(--color-background-secondary)" }}>
                  {[
                    "Subject",
                    "Max Marks",
                    "Marks Obtained",
                    "Percentage",
                    "Grade Points",
                    "Grade",
                    "Result",
                    "Remarks",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        fontWeight: 500,
                        border: "0.5px solid var(--color-border-tertiary)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grades.map((g) => {
                  const sub = data.subjects.find((s) => s.id === g.subjectId);
                  if (!sub) return null;
                  const pct = (g.marks / sub.maxMarks) * 100;
                  const gr = calcGrade(pct);
                  const pass = pct >= data.settings.passingMarks;
                  return (
                    <tr
                      key={g.id}
                      style={{
                        borderBottom:
                          "0.5px solid var(--color-border-tertiary)",
                      }}
                    >
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "0.5px solid var(--color-border-tertiary)",
                        }}
                      >
                        {sub.name}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "0.5px solid var(--color-border-tertiary)",
                          textAlign: "center",
                        }}
                      >
                        {sub.maxMarks}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "0.5px solid var(--color-border-tertiary)",
                          textAlign: "center",
                          fontWeight: 500,
                        }}
                      >
                        {g.marks}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "0.5px solid var(--color-border-tertiary)",
                          textAlign: "center",
                        }}
                      >
                        {pct.toFixed(1)}%
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "0.5px solid var(--color-border-tertiary)",
                          textAlign: "center",
                        }}
                      >
                        {gr.gp.toFixed(1)}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "0.5px solid var(--color-border-tertiary)",
                          textAlign: "center",
                        }}
                      >
                        <Badge
                          color={
                            gr.gp >= 7
                              ? "success"
                              : gr.gp >= 5
                              ? "warning"
                              : "danger"
                          }
                        >
                          {gr.letter}
                        </Badge>
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "0.5px solid var(--color-border-tertiary)",
                          textAlign: "center",
                        }}
                      >
                        <Badge color={pass ? "success" : "danger"}>
                          {pass ? "Pass" : "Fail"}
                        </Badge>
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "0.5px solid var(--color-border-tertiary)",
                        }}
                      >
                        {g.remarks || "—"}
                      </td>
                    </tr>
                  );
                })}
                <tr
                  style={{
                    background: "var(--color-background-secondary)",
                    fontWeight: 500,
                  }}
                >
                  <td
                    style={{
                      padding: "8px 10px",
                      border: "0.5px solid var(--color-border-tertiary)",
                    }}
                  >
                    Total / CGPA
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      border: "0.5px solid var(--color-border-tertiary)",
                      textAlign: "center",
                    }}
                  >
                    {grades.length * 100}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      border: "0.5px solid var(--color-border-tertiary)",
                      textAlign: "center",
                    }}
                  >
                    {st.total}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      border: "0.5px solid var(--color-border-tertiary)",
                      textAlign: "center",
                    }}
                  >
                    {st.pct}%
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      padding: "8px 10px",
                      border: "0.5px solid var(--color-border-tertiary)",
                      textAlign: "center",
                    }}
                  >
                    CGPA: {st.gpa}
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      padding: "8px 10px",
                      border: "0.5px solid var(--color-border-tertiary)",
                      textAlign: "center",
                      color:
                        parseFloat(st.pct) >= 35
                          ? COLORS.success
                          : COLORS.danger,
                      fontWeight: 500,
                    }}
                  >
                    Overall:{" "}
                    {parseFloat(st.pct) >= 35 ? "PROMOTED" : "DETAINED"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
                marginTop: 24,
                paddingTop: 16,
                borderTop: "0.5px solid var(--color-border-tertiary)",
                fontSize: 12,
                color: "var(--color-text-secondary)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: 1,
                    background: "var(--color-border-tertiary)",
                    marginBottom: 4,
                  }}
                />
                Class Teacher
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: 1,
                    background: "var(--color-border-tertiary)",
                    marginBottom: 4,
                  }}
                />
                Principal
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: 1,
                    background: "var(--color-border-tertiary)",
                    marginBottom: 4,
                  }}
                />
                Parent / Guardian
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: "var(--color-text-secondary)",
          }}
        >
          {user.role === "student"
            ? "No grade data available yet."
            : "Select a student to generate their report card."}
        </div>
      )}
    </div>
  );
}

function SettingsPage({ data, setData }) {
  const [form, setForm] = useState({ ...data.settings });
  const save = () => {
    setData((d) => ({ ...d, settings: form }));
    alert("Settings saved!");
  };
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 20px" }}>
        System Settings
      </h2>
      <Card style={{ maxWidth: 500 }}>
        <Input
          label="School Name"
          value={form.schoolName}
          onChange={(e) =>
            setForm((f) => ({ ...f, schoolName: e.target.value }))
          }
        />
        <Input
          label="Academic Session"
          value={form.session}
          onChange={(e) => setForm((f) => ({ ...f, session: e.target.value }))}
        />
        <Input
          label="Passing Marks (%)"
          type="number"
          value={form.passingMarks}
          onChange={(e) =>
            setForm((f) => ({ ...f, passingMarks: parseInt(e.target.value) }))
          }
        />
        <Btn onClick={save}>Save Settings</Btn>
      </Card>
    </div>
  );
}

function StudentDashboard({ data, user }) {
  const st = calcStudentStats(user.id, data.grades, data.subjects);
  const grades = data.grades.filter((g) => g.studentId === user.id);
  const attRec = data.attendance.filter((a) => a.studentId === user.id);
  const avgAtt = attRec.length
    ? (
        attRec.reduce((s, a) => s + (a.present / a.total) * 100, 0) /
        attRec.length
      ).toFixed(1)
    : null;
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 6px" }}>
        Welcome, {user.name.split(" ")[0]}!
      </h2>
      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: 13,
          margin: "0 0 20px",
        }}
      >
        Class: {user.class || "—"} · ID: {user.studentId || "—"}
      </p>
      {st ? (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <StatCard
              label="Overall %"
              value={`${st.pct}%`}
              color={COLORS.primary}
            />
            <StatCard label="GPA" value={st.gpa} color={COLORS.success} />
            <StatCard
              label="Grade"
              value={st.grade.letter}
              color={parseFloat(st.gpa) >= 7 ? COLORS.success : COLORS.warning}
              sub={st.grade.desc}
            />
            <StatCard
              label="Attendance"
              value={avgAtt ? `${avgAtt}%` : "—"}
              color={
                avgAtt && parseFloat(avgAtt) >= 75
                  ? COLORS.success
                  : COLORS.danger
              }
            />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Card>
              <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>
                Recent Grades
              </h3>
              {grades.slice(0, 5).map((g) => {
                const sub = data.subjects.find((s) => s.id === g.subjectId);
                const pct = sub ? (g.marks / sub.maxMarks) * 100 : 0;
                const gr = calcGrade(pct);
                return (
                  <div
                    key={g.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "0.5px solid var(--color-border-tertiary)",
                    }}
                  >
                    <span style={{ fontSize: 13 }}>{sub?.name}</span>
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 500 }}>
                        {g.marks}/{sub?.maxMarks}
                      </span>
                      <Badge
                        color={
                          gr.gp >= 7
                            ? "success"
                            : gr.gp >= 5
                            ? "warning"
                            : "danger"
                        }
                      >
                        {gr.letter}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </Card>
            <Card>
              <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>
                Quick Stats
              </h3>
              <div style={{ fontSize: 13 }}>
                {[
                  {
                    label: "Highest Score",
                    value: `${st.highest}/100`,
                    color: COLORS.success,
                  },
                  {
                    label: "Lowest Score",
                    value: `${st.lowest}/100`,
                    color:
                      parseFloat(st.lowest) < 40
                        ? COLORS.danger
                        : COLORS.warning,
                  },
                  {
                    label: "Average Score",
                    value: `${st.avg}`,
                    color: COLORS.info,
                  },
                  {
                    label: "Total Marks",
                    value: `${st.total}/${st.count * 100}`,
                    color: COLORS.primary,
                  },
                  {
                    label: "CGPA",
                    value: `${st.gpa} / 10.0`,
                    color: COLORS.success,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "0.5px solid var(--color-border-tertiary)",
                    }}
                  >
                    <span style={{ color: "var(--color-text-secondary)" }}>
                      {item.label}
                    </span>
                    <strong style={{ color: item.color }}>{item.value}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      ) : (
        <Card>
          <div
            style={{
              textAlign: "center",
              color: "var(--color-text-secondary)",
              padding: 24,
            }}
          >
            No grade data available yet. Check back once your teacher enters
            marks.
          </div>
        </Card>
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("dashboard");
  const [data, setData] = useState(INITIAL_DATA);

  if (!user)
    return (
      <LoginScreen
        onLogin={(u) => {
          setUser(u);
          setActive("dashboard");
        }}
      />
    );

  const renderPage = () => {
    if (active === "dashboard") {
      if (user.role === "admin") return <AdminDashboard data={data} />;
      if (user.role === "student")
        return <StudentDashboard data={data} user={user} />;
      return <AdminDashboard data={data} />;
    }
    if (active === "students")
      return <StudentsPage data={data} setData={setData} />;
    if (active === "teachers")
      return <TeachersPage data={data} setData={setData} />;
    if (active === "subjects")
      return <SubjectsPage data={data} setData={setData} />;
    if (active === "grades")
      return <GradesPage data={data} setData={setData} user={user} />;
    if (active === "attendance")
      return <AttendancePage data={data} setData={setData} user={user} />;
    if (active === "analytics")
      return <AnalyticsPage data={data} user={user} />;
    if (active === "reports") return <ReportCard data={data} user={user} />;
    if (active === "settings")
      return <SettingsPage data={data} setData={setData} />;
    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--color-background-tertiary)",
      }}
    >
      <Sidebar
        user={user}
        active={active}
        setActive={setActive}
        onLogout={() => setUser(null)}
      />
      <main style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
        {renderPage()}
      </main>
    </div>
  );
}
