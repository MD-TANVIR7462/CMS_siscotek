"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ArrowRight, RefreshCw, Cross, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  captchaAnswer: z.string().min(1, "Please solve the CAPTCHA"),
});
type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", captchaAnswer: "" },
  });

  // Generate CAPTCHA (memoized to prevent unnecessary re-renders)
  const generateCaptcha = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: num1 + num2 });
    setValue("captchaAnswer", "");
  }, [setValue]);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    // CAPTCHA validation
    if (parseInt(data.captchaAnswer) !== captcha.answer) {
      setError("CAPTCHA answer is incorrect. Please try again.");
      generateCaptcha();
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 100));

      if (data.email === "admin@example.com" && data.password === "admin123") {
        router.replace("/customers");
         toast.success("Successfully Logged in!");

      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <div className=" rounded-md shadow-xl overflow-hidden border bg-white">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Lock className="text-white" size={24} />
                </div>
              </motion.div>
              {/* <h1 className="text-2xl font-bold text-white mb-1">Secure Admin Portal</h1> */}
              <p className="text-gray-600">Sign in to access your CMS</p>
            </div>

            {/* Error message */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between  mb-6 p-3 bg-red-500/20 text-red-600 rounded-lg text-sm border border-red-500/30">
                {error}
                <X className="w-4 h-4  rounded-[2px] cursor-pointer" onClick={()=>setError("")}/>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                label="Email"
                id="email"
                type="email"
                icon={<User className="h-5 w-5 text-gray-500" />}
                register={register("email")}
                error={errors.email?.message}
                placeholder="your@email.com"
              />

              {/* Password */}
              <FormField
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                icon={<Lock className="h-5 w-5 text-gray-500" />}
                register={register("password")}
                error={errors.password?.message}
                placeholder="••••••••"
                rightElement={
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-600 transition-colors duration-150" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-600 transition-colors duration-150" />
                    )}
                  </button>
                }
              />

              {/* CAPTCHA */}
              <div>
                <label className="flex items-center gap-3 text-sm font-medium  mb-1">
                  CAPTCHA ({captcha.num1} + {captcha.num2})
                  <button type="button" onClick={generateCaptcha} className="text-indigo-500 hover:text-indigo-700 transition-colors">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </label>
                <input
                  type="number"
                  className="w-full  border border-gray-300 rounded-md py-3 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 ring-black"
                  placeholder="Answer"
                  {...register("captchaAnswer")}
                />
                {errors.captchaAnswer && <p className="mt-1 text-sm text-red-400">{errors.captchaAnswer.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium text-white  bg-black ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-200 text-center border-t border-gray-300">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} CMS. All rights reserved by SiSCOTEK.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 🔹 Reusable Form Field Component
function FormField({ label, id, type, icon, register, error, placeholder, rightElement }: any) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium  mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
        <input
          id={id}
          type={type}
          className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-12 text-black placeholder-gray-400 "
          placeholder={placeholder}
          {...register}
        />
        {rightElement && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightElement}</div>}
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

// 🔹 Spinner Component
function Spinner() {
  return (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
          1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Verifying...
    </>
  );
}
