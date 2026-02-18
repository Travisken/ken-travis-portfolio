"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Toast from "./Toast";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Email is invalid";
    if (!form.message.trim()) err.message = "Message is required";
    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setToast({ message: "Message sent successfully!", type: "success" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setToast({ message: data.error || "Failed to send message", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to send message", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-1 p-4 md:p-8 space-y-4"
      >
        {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

        <input
          className="w-full rounded-xl bg-black p-4 text-white outline-none"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <input
          className="w-full rounded-xl bg-black p-4 text-white outline-none"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <textarea
          className="w-full rounded-xl bg-black p-4 text-white outline-none h-32"
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-black font-medium transition hover:opacity-90 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
