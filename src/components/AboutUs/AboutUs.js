"use client";
import React, { useState, useEffect } from "react";
import {
  Dna,
  Microscope,
  BrainCircuit,
  Activity,
  BarChart2,
  Users,
  ArrowRight,
  Code2,
  TestTube2,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    id: "stat-1",
    number: "10K+",
    label: "Genomes Analyzed",
    icon: <Dna className="h-6 w-6 text-purple-600" aria-hidden="true" />,
    bgColor: "bg-purple-100",
  },
  {
    id: "stat-2",
    number: "500K+",
    label: "Biomarkers Tracked",
    icon: <BarChart2 className="h-6 w-6 text-purple-600" aria-hidden="true" />,
    bgColor: "bg-purple-100",
  },
  {
    id: "stat-3",
    number: "100+",
    label: "AI Algorithms Developed",
    icon: (
      <BrainCircuit className="h-6 w-6 text-purple-600" aria-hidden="true" />
    ),
    bgColor: "bg-purple-100",
  },
  {
    id: "stat-4",
    number: "1M+",
    label: "Personalized Recommendations",
    icon: <Activity className="h-6 w-6 text-purple-600" aria-hidden="true" />,
    bgColor: "bg-purple-100",
  },
];

const resources = [
  {
    id: "resource-1",
    IconComponent: Dna,
    title: "DNA-Based Diet Guides",
    description:
      "Learn how to interpret your genetic data for optimal nutrition.",
  },
  {
    id: "resource-2",
    IconComponent: Microscope,
    title: "Microbiome Masterclass",
    description: "Science-backed strategies to optimize your gut health.",
  },
  {
    id: "resource-3",
    IconComponent: BrainCircuit,
    title: "AI Meal Planning",
    description: "Dynamic meal plans adapting to your biomarkers in real-time.",
  },
];

const values = [
  {
    id: "value-1",
    IconComponent: TestTube2,
    title: "Evidence-Based Nutrition",
    description:
      "We translate cutting-edge omics research into actionable dietary insights.",
  },
  {
    id: "value-2",
    IconComponent: Code2,
    title: "Precision Health",
    description:
      "Your unique biology deserves personalized nutrition, not one-size-fits-all diets.",
  },
  {
    id: "value-3",
    IconComponent: Users,
    title: "Empowered Community",
    description:
      "Join thousands decoding their biology for optimal health through data.",
  },
];

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="pt-12 min-h-screen bg-gray-50">
      <section
        aria-labelledby="about-hero-heading"
        className="relative py-20 bg-gradient-to-r from-purple-50 to-blue-50"
      >
        <div
          className="absolute inset-0 bg-grid-white/[0.05]"
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              id="about-hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Decoding Your Biology for Optimal Nutrition
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Omnicnutrition pioneers AI-driven analysis of your DNA,
              microbiome, and metabolism to deliver hyper-personalized dietary
              recommendations that evolve with your biomarkers.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="stats-heading" className="py-16 bg-white">
        <h2 id="stats-heading" className="sr-only">
          Our Scientific Impact
        </h2>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`text-center p-6 bg-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`mx-auto mb-4 w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center`}
                  aria-hidden="true"
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="mission-heading"
        className="py-20 bg-purple-100"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2
                id="mission-heading"
                className="text-3xl md:text-4xl font-bold text-purple-800 mb-6"
              >
                Our Scientific Approach
              </h2>
              <p className="text-gray-800 text-lg mb-8">
                In an era of generic diet trends, we combine AI with multi-omics
                data to:
              </p>
              <div className="space-y-6">
                {values.map(
                  ({ id, IconComponent, title, description }, index) => (
                    <div key={id} className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div
                          className="w-12 h-12 rounded-lg bg-purple-200 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <IconComponent className="h-6 w-6 text-purple-700" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-purple-700 mb-2">
                          {title}
                        </h3>
                        <p className="text-gray-600">{description}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div
              className={`relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c0ec2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Scientist analyzing DNA data"
                  className="w-full h-auto rounded-2xl object-cover transition-all duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="offerings-heading" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2
            id="offerings-heading"
            className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Data-Driven Nutrition Resources
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Cutting-edge tools to translate your biological data into actionable
            eating strategies
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map(
              ({ id, IconComponent, title, description }, index) => (
                <div
                  key={id}
                  className={`bg-purple-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-100 flex flex-col ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center mb-5"
                    aria-hidden="true"
                  >
                    <IconComponent className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-600 mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-5 flex-grow">{description}</p>
                  <Link
                    href="/blogs"
                    className="inline-flex items-center text-gray-700 hover:text-purple-600 font-medium transition-colors mt-auto group"
                    aria-label={`Explore more about ${title}`}
                  >
                    Explore science
                    <ArrowRight
                      className="w-5 h-5 ml-1 transition-transform transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cta-heading"
        className="py-20 bg-gradient-to-r from-purple-50 to-blue-50"
      >
        <div className="container mx-auto px-6 text-center">
          <h2
            id="cta-heading"
            className="text-3xl font-bold text-gray-800 mb-6"
          >
            Ready to Eat According to Your DNA?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands using AI-powered omics analysis to optimize their
            nutrition.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Start Your Biological Analysis
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
