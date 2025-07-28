"use client";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ajaxCall from "@/helpers/ajaxCall";
import {
  Mail,
  Send,
  User,
  MapPin,
  ArrowRight,
  Smartphone,
  Dna,
  BrainCircuit,
  Microscope,
  Activity,
} from "lucide-react";

const ContactUs = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await ajaxCall("/message/message/", {
        method: "POST",
        data: { ...data, site: "7" },
      });
      if (response.status === 200 || response.status === 201) {
        toast.success(
          "Message sent successfully! 🧬 We'll analyze your query and respond with personalized insights."
        );
        reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="py-12 min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-blue-50">
        <div className="relative py-16 sm:py-20">
          <div
            className="absolute inset-0 bg-grid-white/[0.03]"
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <p className="inline-block border border-purple-600 py-1 px-3 rounded-full bg-gradient-to-br from-purple-700 via-purple-600 to-purple-700 bg-clip-text text-transparent font-medium text-sm mb-4 shadow-sm">
                DATA-DRIVEN NUTRITION SUPPORT
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get AI-Powered Nutrition Guidance
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Our team of nutrigenomics experts and AI specialists are ready
                to help you interpret your biological data for optimal health.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-start">
              <section
                aria-labelledby="form-heading"
                className="md:col-span-7 bg-white rounded-3xl shadow-xl p-6 sm:p-8 transform transition-all duration-500 hover:shadow-2xl"
              >
                <h2
                  id="form-heading"
                  className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                >
                  <BrainCircuit className="h-6 w-6 text-gray-600 mr-3" />
                  Request Personalized Analysis
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div
                          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                          aria-hidden="true"
                        >
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Controller
                          name="name"
                          control={control}
                          rules={{ required: "Name is required" }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              id="name"
                              autoComplete="name"
                              className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                              placeholder="Jane Doe"
                              aria-required="true"
                              aria-invalid={errors.name ? "true" : "false"}
                              aria-describedby={
                                errors.name ? "name-error" : undefined
                              }
                            />
                          )}
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="text-red-500 text-sm mt-1"
                            role="alert"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div
                          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                          aria-hidden="true"
                        >
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
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
                              type="email"
                              id="email"
                              autoComplete="email"
                              className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                              placeholder="you@example.com"
                              aria-required="true"
                              aria-invalid={errors.email ? "true" : "false"}
                              aria-describedby={
                                errors.email ? "email-error" : undefined
                              }
                            />
                          )}
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-red-500 text-sm mt-1"
                            role="alert"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      What can we help analyze?
                    </label>
                    <div className="relative">
                      <div
                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        aria-hidden="true"
                      >
                        <Dna className="h-5 w-5 text-gray-400" />
                      </div>
                      <Controller
                        name="subject"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            id="subject"
                            autoComplete="off"
                            className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                            placeholder="DNA test results, microbiome analysis, etc."
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Biological Questions{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="message"
                      control={control}
                      rules={{ required: "Please share your health goals" }}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          id="message"
                          rows="5"
                          className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="Tell us about your health goals and any test results you'd like analyzed..."
                          aria-required="true"
                          aria-invalid={errors.message ? "true" : "false"}
                          aria-describedby={
                            errors.message ? "message-error" : undefined
                          }
                        />
                      )}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Request Analysis
                    <Send
                      className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </button>
                </form>
              </section>

              <aside className="md:col-span-5 space-y-8">
                <section
                  aria-labelledby="contact-info-heading"
                  className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-gray-800 transform transition-all duration-500 hover:scale-105"
                >
                  <h3
                    id="contact-info-heading"
                    className="text-xl font-bold mb-6 flex items-center"
                  >
                    <Microscope className="h-6 w-6 text-gray-600 mr-3" />
                    Scientific Support Team
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div
                        className="flex-shrink-0 p-3 bg-purple-600 rounded-full mr-4"
                        aria-hidden="true"
                      >
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">
                          Email our nutrigenomics team
                        </p>
                        <a
                          href="mailto:omnicnutrition@gmail.com"
                          className="text-gray-700 hover:text-purple-600 hover:underline"
                        >
                          omnicnutrition@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div
                        className="flex-shrink-0 p-3 bg-purple-600 rounded-full mr-4"
                        aria-hidden="true"
                      >
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">
                          For urgent analysis requests
                        </p>
                        <a
                          href="tel:+91 96385 44455"
                          className="text-gray-700 hover:text-purple-600 hover:underline"
                        >
                          +91 96385 44455
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div
                        className="flex-shrink-0 p-3 bg-purple-600 rounded-full mr-4"
                        aria-hidden="true"
                      >
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm">
                          Omnicnutrition Labs
                        </p>
                        <address className="not-italic text-gray-700">
                          Alkapuri, Vadodara, Gujarat, India 390007
                        </address>
                      </div>
                    </div>
                  </div>
                </section>

                <section
                  aria-labelledby="faq-heading"
                  className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 transform transition-all duration-500 hover:shadow-xl"
                >
                  <h3
                    id="faq-heading"
                    className="text-xl font-bold text-gray-800 mb-4 flex items-center"
                  >
                    <Activity
                      className="h-6 w-6 text-gray-600 mr-3"
                      aria-hidden="true"
                    />
                    Data-Driven Nutrition FAQs
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/"
                        className="flex items-center text-gray-700 hover:text-purple-600 group"
                      >
                        <ArrowRight
                          className="h-4 w-4 mr-2 text-purple-500 transform transition-transform group-hover:translate-x-1 group-hover:text-purple-500"
                          aria-hidden="true"
                        />
                        <span>Interpreting DNA nutrition reports</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="flex items-center text-gray-700 hover:text-purple-600 group"
                      >
                        <ArrowRight
                          className="h-4 w-4 mr-2 text-purple-500 transform transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                        <span>Optimizing meals based on microbiome data</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="flex items-center text-gray-700 hover:text-purple-600 group"
                      >
                        <ArrowRight
                          className="h-4 w-4 mr-2 text-purple-500 transform transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                        <span>
                          Integrating wearable data with nutrition plans
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="flex items-center text-gray-700 hover:text-purple-600 group"
                      >
                        <ArrowRight
                          className="h-4 w-4 mr-2 text-purple-500 transform transition-transform group-hover:translate-x-1 group-hover:text-purple-500"
                          aria-hidden="true"
                        />
                        <span>
                          Understanding AI-generated food recommendations
                        </span>
                      </a>
                    </li>
                  </ul>
                </section>
              </aside>
            </div>

            <section
              aria-labelledby="map-heading"
              className="mt-16 bg-white rounded-3xl shadow-lg p-6 overflow-hidden transform transition-all duration-500 hover:shadow-xl"
            >
              <h3
                id="map-heading"
                className="text-xl font-bold text-gray-800 mb-6 flex items-center"
              >
                <MapPin className="h-6 w-6 text-gray-600 mr-3" />
                Find Us
              </h3>
              <div className="h-80 rounded-2xl overflow-hidden bg-gray-100 aspect-video">
                <iframe
                  title="Anant Soft Computing"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169202432397!2d73.16878167596472!3d22.309439742562773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5873e594259%3A0xda3dc91c20f4beec!2sAnant%20Soft%20Computing!5e0!3m2!1sen!2sin!4v1731308281495!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactUs;
