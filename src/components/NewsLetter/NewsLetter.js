"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ajaxCall from "@/helpers/ajaxCall";
import {
  Mail,
  CheckCircle,
  Dna,
  Microscope,
  BrainCircuit,
  Activity,
  Leaf,
  HeartPulse,
  BarChart2,
} from "lucide-react";

const benefits = [
  "AI-optimized meal plans based on your biology",
  "Exclusive guides to interpreting DNA test results",
  "Early access to microbiome analysis tools",
  "Monthly challenges to optimize your biomarkers",
  "Wearable integration tips for real-time nutrition",
  "Cutting-edge research on nutrigenomics",
];

const NewsLetter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await ajaxCall("/subscription/subscribe-create/", {
        method: "POST",
        data: { email: data.email, site: "7" },
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Welcome to data-driven nutrition! 🧬");
        reset();
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="newsletter-section"
      aria-labelledby="newsletter-heading"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.03]" />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 transition-all duration-700">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 mb-6 shadow-sm">
              <Dna
                className="h-4 w-4 text-purple-600 mr-2"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">
                Science-Backed Nutrition
              </span>
            </div>
            <h2
              id="newsletter-heading"
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              Unlock Your Biological Blueprint
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Get AI-powered dietary insights tailored to your DNA, microbiome,
              and metabolism - straight to your inbox.
            </p>
          </div>
          <div className="max-w-lg mx-auto transition-all duration-700 delay-200">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative flex flex-col sm:flex-row gap-4"
              aria-labelledby="newsletter-heading"
            >
              <div className="relative flex-grow">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email Address
                </label>
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="newsletter-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      aria-required="true"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className="w-full pl-12 pr-4 py-4 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  )}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-500 text-sm mt-1 pl-4"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors duration-300 disabled:opacity-70"
              >
                {isLoading ? "Joining..." : "Join Free"}
                <CheckCircle className="ml-2 h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-400">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-700 bg-white/80 p-3 rounded-lg border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-200">
                  {index === 0 && (
                    <BrainCircuit
                      className="h-4 w-4 text-purple-600"
                      aria-hidden="true"
                    />
                  )}
                  {index === 1 && (
                    <Dna
                      className="h-4 w-4 text-purple-600"
                      aria-hidden="true"
                    />
                  )}
                  {index === 2 && (
                    <Microscope
                      className="h-4 w-4 text-purple-600"
                      aria-hidden="true"
                    />
                  )}
                  {index === 3 && (
                    <Activity
                      className="h-4 w-4 text-purple-600"
                      aria-hidden="true"
                    />
                  )}
                  {index === 4 && (
                    <BarChart2
                      className="h-4 w-4 text-purple-600"
                      aria-hidden="true"
                    />
                  )}
                  {index === 5 && (
                    <Leaf
                      className="h-4 w-4 text-purple-600"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500 transition-all duration-700 delay-500">
            No spam. Unsubscribe anytime. Your data is never shared.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
