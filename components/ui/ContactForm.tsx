"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.message.trim()) err.message = "Message is required";
    return err;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log("Form submitted:", form);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex-1 p-4 md:p-8 space-y-4"
    >
      <input
        className="w-full rounded-xl bg-black p-4 text-white outline-none"
        placeholder="Your Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

      <input
        className="w-full rounded-xl bg-black p-4 text-white outline-none"
        placeholder="Email Address"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      <textarea
        className="w-full rounded-xl bg-black p-4 text-white outline-none h-32"
        placeholder="Your Message"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {errors.message && (
        <p className="text-red-500 text-xs">{errors.message}</p>
      )}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-black font-medium transition hover:opacity-90"
      >
        Send Message
      </button>
    </motion.form>
  );
}
