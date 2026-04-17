import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Clock3,
  Home,
  LogOut,
  Pencil,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const createEmptyClassForm = () => ({
  title: "",
  level: "Beginner",
  image: "",
  price: "",
  duration: "",
  rating: "",
  students: "",
  description: "",
  instructor: "",
  time: "",
  schedule: "",
  features: [""],
  mode: "Online",
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionTr = motion.tr;
const MotionForm = motion.form;
const MotionArticle = motion.article;

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showClassForm, setShowClassForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [classForm, setClassForm] = useState(createEmptyClassForm);

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, []);

  const resetClassForm = () => {
    setEditingClass(null);
    setClassForm(createEmptyClassForm());
    setShowClassForm(false);
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://learnserver-backend.onrender.com/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch("https://learnserver-backend.onrender.com/api/classes");
      const data = await response.json();
      if (data.success) {
        setClasses(data.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClass = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        editingClass
          ? `https://learnserver-backend.onrender.com/api/classes/${editingClass._id}`
          : "https://learnserver-backend.onrender.com/api/classes",
        {
          method: editingClass ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(classForm),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(editingClass ? "Class updated successfully!" : "Class added successfully!");
        resetClassForm();
        fetchClasses();
      } else {
        alert(data.message || "Unable to save class");
      }
    } catch (error) {
      console.error("Class save error:", error);
      alert("Failed to save class");
    }
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setClassForm({
      title: classItem.title || "",
      level: classItem.level || "Beginner",
      image: classItem.image || "",
      price: classItem.price || "",
      duration: classItem.duration || "",
      rating: classItem.rating || "",
      students: classItem.students || "",
      description: classItem.description || "",
      instructor: classItem.instructor || "",
      time: classItem.time || "",
      schedule: classItem.schedule || "",
      features: classItem.features?.length ? classItem.features : [""],
      mode: classItem.mode || "Online",
    });
    setShowClassForm(true);
  };

  const handleDeleteClass = async (classId) => {
    if (!confirm("Are you sure you want to delete this class?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://learnserver-backend.onrender.com/api/classes/${classId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        alert("Class deleted successfully!");
        fetchClasses();
      } else {
        alert(data.message || "Failed to delete class");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete class");
    }
  };

  const handleFeatureChange = (index, value) => {
    const features = [...classForm.features];
    features[index] = value;
    setClassForm((current) => ({ ...current, features }));
  };

  const addFeature = () => {
    setClassForm((current) => ({ ...current, features: [...current.features, ""] }));
  };

  const removeFeature = (index) => {
    const features = classForm.features.filter((_, featureIndex) => featureIndex !== index);
    setClassForm((current) => ({ ...current, features: features.length ? features : [""] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f7faf9_0%,#eef7f5_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center rounded-[2rem] border border-white/80 bg-white/80 px-8 py-24 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
            </div>
            <p className="mt-5 text-lg font-medium text-gray-700">Preparing the admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.12),transparent_24%),linear-gradient(180deg,#f8fbfa_0%,#eef6f4_100%)] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <MotionSection
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <div className="grid gap-6 border-b border-slate-100 px-5 py-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#0f172a_0%,#164e63_52%,#0f766e_100%)] px-6 py-7 text-white">
              <div className="absolute -right-12 top-0 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute left-12 top-12 h-20 w-20 rounded-full bg-emerald-300/10 blur-2xl" />
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                <Sparkles size={14} />
                Admin studio space
              </span>
              <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[0.94]">
                Manage your classes and members with a calmer control panel.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/75 sm:text-base">
                Same backend, same auth, same CRUD behavior. The admin experience now matches the premium wellness direction of the site.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="surface-card-soft px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Signed in</p>
                <p className="mt-3 text-3xl font-semibold text-gray-900">{user?.name || "Admin"}</p>
                <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="surface-card-soft px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Role</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
                  <ShieldCheck size={16} />
                  {user?.role || "admin"}
                </div>
                <p className="mt-3 text-sm text-gray-500">Protected access enabled</p>
              </div>
              <a
                href="/"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-teal-200 hover:text-teal-700"
              >
                <Home size={16} />
                View site
              </a>
              <button
                onClick={logout}
                className="primary-btn rounded-full px-5 py-3 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Registered users",
                  value: users.length,
                  accent: "bg-teal-50 text-teal-700",
                  iconElement: <Users size={20} />,
                },
                {
                  label: "Published classes",
                  value: classes.length,
                  accent: "bg-emerald-50 text-emerald-700",
                  iconElement: <BookOpen size={20} />,
                },
                {
                  label: "Active tab",
                  value: activeTab === "users" ? "Users" : "Classes",
                  accent: "bg-sky-50 text-sky-700",
                  iconElement: <Sparkles size={20} />,
                },
              ].map(({ label, value, accent, iconElement }, index) => (
                <MotionDiv
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.4 }}
                  className="surface-card-soft px-5 py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{label}</p>
                      <p className="mt-3 text-4xl font-semibold text-gray-900">{value}</p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${accent}`}>{iconElement}</div>
                  </div>
                </MotionDiv>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("users")}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeTab === "users"
                    ? "bg-gray-900 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-gray-700 hover:border-teal-200 hover:text-teal-700"
                }`}
              >
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab("classes")}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeTab === "classes"
                    ? "bg-gray-900 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-gray-700 hover:border-teal-200 hover:text-teal-700"
                }`}
              >
                Classes ({classes.length})
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "users" ? (
                <MotionDiv
                  key="users-tab"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">User records</p>
                      <h2 className="mt-2 text-3xl font-semibold text-gray-900">Members and admins</h2>
                    </div>
                    <div className="hidden rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-gray-500 sm:block">
                      Sorted by latest join date in your backend response
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                      <thead className="bg-slate-50/90 text-xs uppercase tracking-[0.18em] text-gray-500">
                        <tr>
                          {["Name", "Email", "Mobile", "Address", "Role", "Joined"].map((heading) => (
                            <th key={heading} className="px-6 py-4 font-semibold">{heading}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((member, index) => (
                          <MotionTr
                            key={member._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.25 }}
                            className="border-t border-slate-100 text-sm text-gray-700"
                          >
                            <td className="px-6 py-4 font-semibold text-gray-900">{member.name}</td>
                            <td className="px-6 py-4">{member.email}</td>
                            <td className="px-6 py-4">{member.mobile}</td>
                            <td className="px-6 py-4 max-w-[240px]">{member.address}</td>
                            <td className="px-6 py-4">
                              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
                                {member.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">{new Date(member.createdAt).toLocaleDateString()}</td>
                          </MotionTr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </MotionDiv>
              ) : (
                <MotionDiv
                  key="classes-tab"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6"
                >
                  <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Class manager</p>
                      <h2 className="mt-2 text-3xl font-semibold text-gray-900">Create, refine, and publish classes</h2>
                      <p className="mt-2 text-sm text-gray-500">All actions below still use the same backend endpoints and auth token flow.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingClass(null);
                        setClassForm(createEmptyClassForm());
                        setShowClassForm(true);
                      }}
                      className="primary-btn rounded-full px-5 py-3 text-sm"
                    >
                      <Plus size={16} />
                      Add class
                    </button>
                  </div>

                  <AnimatePresence>
                    {showClassForm && (
                      <MotionForm
                        initial={{ opacity: 0, height: 0, y: -12 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -12 }}
                        transition={{ duration: 0.28 }}
                        onSubmit={handleSubmitClass}
                        className="mb-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white"
                      >
                        <div className="border-b border-slate-100 px-6 py-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                                {editingClass ? "Edit class" : "New class"}
                              </p>
                              <h3 className="mt-2 text-3xl font-semibold text-gray-900">
                                {editingClass ? "Update class details" : "Create a new class listing"}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={resetClassForm}
                              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-gray-600 transition hover:bg-slate-200"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="px-6 py-6">
                          <div className="grid gap-5 md:grid-cols-2">
                            {[
                              ["title", "Title", "text"],
                              ["level", "Level", "text"],
                              ["image", "Image URL", "url"],
                              ["price", "Price", "text"],
                              ["duration", "Duration", "text"],
                              ["rating", "Rating", "text"],
                              ["students", "Students", "text"],
                              ["instructor", "Instructor", "text"],
                              ["time", "Time", "text"],
                              ["schedule", "Schedule", "text"],
                            ].map(([field, label, type]) => (
                              <div key={field}>
                                <label htmlFor={field} className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
                                <input
                                  id={field}
                                  type={type}
                                  value={classForm[field]}
                                  onChange={(event) => setClassForm((current) => ({ ...current, [field]: event.target.value }))}
                                  required
                                  className="field-input"
                                />
                              </div>
                            ))}
                          </div>

                          <div className="mt-5">
                            <label htmlFor="mode" className="mb-2 block text-sm font-semibold text-gray-700">Mode</label>
                            <select
                              id="mode"
                              value={classForm.mode}
                              onChange={(event) => setClassForm((current) => ({ ...current, mode: event.target.value }))}
                              required
                              className="field-input"
                            >
                              <option value="Online">Online</option>
                              <option value="Offline">Offline</option>
                              <option value="Hybrid">Hybrid</option>
                            </select>
                          </div>

                          <div className="mt-5">
                            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
                            <textarea
                              id="description"
                              rows="4"
                              value={classForm.description}
                              onChange={(event) => setClassForm((current) => ({ ...current, description: event.target.value }))}
                              required
                              className="field-input resize-none"
                            />
                          </div>

                          <div className="mt-5 rounded-[1.4rem] bg-slate-50 px-5 py-5">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Feature points</p>
                                <p className="mt-1 text-sm text-gray-500">These show what members get inside a class card.</p>
                              </div>
                              <button
                                type="button"
                                onClick={addFeature}
                                className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                              >
                                Add feature
                              </button>
                            </div>

                            <div className="grid gap-3">
                              {classForm.features.map((feature, index) => (
                                <div key={index} className="flex gap-3">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(event) => handleFeatureChange(index, event.target.value)}
                                    required
                                    className="field-input"
                                    placeholder="Enter feature"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button type="submit" className="primary-btn rounded-full px-6 py-3 text-sm">
                              {editingClass ? "Update class" : "Create class"}
                            </button>
                            <button
                              type="button"
                              onClick={resetClassForm}
                              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-slate-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </MotionForm>
                    )}
                  </AnimatePresence>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {classes.map((classItem, index) => (
                      <MotionArticle
                        key={classItem._id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.3 }}
                        whileHover={{ y: -6 }}
                        className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
                      >
                        <div className="relative">
                          <img src={classItem.image} alt={classItem.title} className="h-52 w-full object-cover" />
                          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 shadow-sm">
                              {classItem.level}
                            </span>
                            <span className="rounded-full bg-gray-900/88 px-3 py-1 text-xs font-semibold text-white">
                              {classItem.price}
                            </span>
                          </div>
                        </div>

                        <div className="px-5 py-5">
                          <h3 className="text-3xl font-semibold text-gray-900">{classItem.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-gray-600">{classItem.description}</p>

                          <div className="mt-5 grid gap-2 rounded-[1.25rem] bg-slate-50 px-4 py-4 text-sm text-gray-600">
                            <p className="inline-flex items-center gap-2">
                              <BookOpen size={15} className="text-teal-700" />
                              Instructor: {classItem.instructor}
                            </p>
                            <p className="inline-flex items-center gap-2">
                              <Clock3 size={15} className="text-teal-700" />
                              {classItem.time}
                            </p>
                            <p className="inline-flex items-center gap-2">
                              <Calendar size={15} className="text-teal-700" />
                              {classItem.schedule}
                            </p>
                          </div>

                          <div className="mt-5 flex gap-3">
                            <button
                              onClick={() => handleEditClass(classItem)}
                              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-teal-200 hover:text-teal-700"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClass(classItem._id)}
                              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </MotionArticle>
                    ))}
                  </div>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>
        </MotionSection>
      </div>
    </div>
  );
}
