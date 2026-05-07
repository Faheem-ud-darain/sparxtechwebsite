import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import { CONTACT_INFO } from '@/data/constants';

const Terms = () => {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Header />
      
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg-fade pointer-events-none opacity-40" />
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-green-500/[0.03] blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedContent direction="up">
            <span className="pill-badge mb-6">
              <span className="glow-dot" />
              LEGAL
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12">
              Terms & <span className="text-green-500">Conditions</span>
            </h1>

            <div className="prose prose-invert prose-green max-w-none space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p>
                  Welcome to SPARX Studioz & Technologies ("we," "our," or "us"). By accessing or using our website and services, you agree to comply with and be bound by these Terms & Conditions. SPARX Studioz & Technologies is a creative and technology-driven digital agency based in Abbottabad, Pakistan.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                <p>
                  We provide a comprehensive range of digital services, including but not limited to UI/UX Designing, Web Development, WordPress Development, SEO, Social Media Marketing, Product Photography, Graphics Designing, Online Shop Management, Content Writing, Academic Writing, and Virtual Assistant Services.
                </p>
                <p className="mt-2">
                  All services are subject to the specific agreements and contracts established between SPARX Studioz & Technologies and the client. We reserve the right to modify or discontinue any service with notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
                <p>
                  All content, designs, code, and intellectual property created by SPARX Studioz & Technologies during the course of a project remain our property until full payment is received. Upon final payment, ownership rights will be transferred to the client as outlined in the project agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Client Responsibilities</h2>
                <p>
                  Clients must provide accurate and timely information, materials, and approvals necessary for the successful completion of the project. Any delays caused by the client may result in project timeline extensions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Revisions and Modifications</h2>
                <p>
                  Our services include a specified number of revisions as detailed in individual project proposals. Any additional revisions or out-of-scope changes will be billed at our standard hourly or fixed rates.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Payment Terms</h2>
                <p>
                  Payment schedules, including deposits and milestone payments, will be clearly defined in the project agreement. We reserve the right to suspend services if payments are not made according to the agreed schedule.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                <p>
                  SPARX Studioz & Technologies shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or products. Our total liability is limited to the amount paid for the specific services rendered.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Contact Information</h2>
                <p>
                  For any questions or concerns regarding these Terms & Conditions, please contact us at:
                  <br /><br />
                  Email: {CONTACT_INFO.email}<br />
                  Phone: {CONTACT_INFO.phone}<br />
                  WhatsApp: {CONTACT_INFO.whatsapp}<br />
                  Address: {CONTACT_INFO.address}
                </p>
              </section>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Terms;
