"use client";
import {
  Check,
  X,
  FileText,
  Mail,
  CalendarDays,
  Dna,
  BrainCircuit,
} from "lucide-react";

const WriteForUs = () => {
  return (
    <main className="py-12 min-h-screen px-4 sm:px-6 lg:px-12">
      <section
        className="relative py-16 sm:py-20"
        aria-labelledby="privacy-main-heading"
      >
        <div
          className="absolute inset-0 bg-grid-white/[0.03]"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Write for Us – Guest Post Guidelines
            </h1>
            <p className="text-lg text-gray-700 mx-auto">
              Share your expertise in AI-driven nutrition, nutrigenomics, and
              personalized health
            </p>
          </div>
          <div className="space-y-6" role="list">
            <div
              className="bg-white shadow-md rounded-lg overflow-hidden"
              role="listitem"
              aria-labelledby="policy-introduction-heading"
            >
              <div className="p-6">
                <p className="text-gray-600">
                  At Omnicnutrition, we're pioneering the future of data-driven
                  nutrition through AI analysis of DNA, microbiome, and
                  metabolic biomarkers. We welcome contributions from
                  researchers, nutritionists, and tech innovators advancing
                  personalized health.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BrainCircuit className="h-6 w-6 text-purple-600 mr-3" />
                  Scientific Contribution Guidelines
                </h2>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  1. Original Research & Analysis
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Submit only original research or novel analysis - no
                      repurposed content or AI-generated articles.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      We verify all submissions through plagiarism and
                      originality checks.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  2. Priority Research Areas
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-3">We prioritize:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Nutrigenomics research (gene-diet interactions)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Microbiome-nutrition clinical studies</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>AI/ML applications in personalized nutrition</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Wearable data integration for real-time dietary
                      adjustments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Case studies on biomarker-driven meal optimization
                    </span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-gray-600 mb-3">We don't accept:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        Generic nutrition advice without biological data
                        integration
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        Unsubstantiated health claims without peer-reviewed
                        evidence
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  3. Research Quality Standards
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Academic rigor: Cite all sources using AMA or APA format
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Depth: 1,500+ words with methodology, results, and
                      actionable conclusions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Technical accessibility: Explain complex concepts for
                      educated lay audiences
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  4. Data & Methodology Transparency
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Disclose all funding sources and potential conflicts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Include data availability statements when applicable
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  5. Evidence Requirements
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Clinical claims must reference peer-reviewed studies
                      (include DOI links)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      For AI/ML models, describe training data and validation
                      methods
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  6. Technical Specifications
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Data visualizations: Include high-resolution charts/graphs
                      with alt text
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Metadata: Structured abstract (Background, Methods,
                      Results, Conclusions)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  7. Restricted Content
                </h2>
              </div>
              <div className="p-6">
                <p className="font-medium text-gray-800">We do not publish:</p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Non-data-driven nutrition advice</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Unreplicated preclinical studies</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Supplement promotions without clinical evidence</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  8. Dissemination Requirements
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Accepted contributors must share findings on academic/social
                  platforms (tag @OmnicnutritionAI).
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Submission Process
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6 text-gray-600">
                  <div>
                    <p className="mb-4">
                      Email your manuscript or proposal to{" "}
                      <a
                        href="mailto:omnicnutrition@gmail.com"
                        className="text-purple-600 hover:underline font-medium"
                      >
                        omnicnutrition@gmail.com
                      </a>{" "}
                      with:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Mail className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Subject:</strong> "Research Submission: [Your
                          Study Focus]"
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Structured abstract (250 words max)</span>
                      </li>
                      <li className="flex items-start">
                        <Dna className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          Author credentials (affiliation, relevant
                          publications)
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <CalendarDays className="h-5 w-5 text-purple-600 mr-2" />
                      Peer Review Timeline:
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Initial screening (3-5 business days)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          Full review by our science board (2-3 weeks)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          No status inquiries - we contact you if accepted
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> By submitting, you agree to
                      potential edits for clarity and consistency with our
                      scientific standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WriteForUs;
