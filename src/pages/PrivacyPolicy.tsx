import Footer from '@/components/layout/Footer';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import { CONTACT_INFO } from '@/data/constants';

const PrivacyPolicy = () => {
  return (
    <main className="relative min-h-screen bg-[#030303] text-white">
      
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg-fade pointer-events-none opacity-40" />
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedContent direction="up">
            <span className="pill-badge mb-6">
              <span className="glow-dot bg-blue-500" />
              LEGAL
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12">
              Privacy <span className="text-blue-500">Policy</span>
            </h1>

            <div className="prose prose-invert prose-blue max-w-none space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p>
                  SPARX Studioz & Technologies ("we," "our," or "us") is committed to protecting the privacy and security of our clients and website visitors. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                <p>
                  We may collect personal information such as your name, email address, phone number, and company details when you contact us, request a quote, or engage our services. We also collect non-personal data such as browser type, IP address, and website usage metrics to improve our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p>
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Provide, maintain, and improve our digital services</li>
                  <li>Communicate with you regarding projects, updates, and support</li>
                  <li>Process transactions and send invoices</li>
                  <li>Analyze website traffic and optimize user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Protection & Security</h2>
                <p>
                  We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no data transmission over the internet or electronic storage method is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Sharing Your Information</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share information with trusted third-party service providers who assist us in operating our business and delivering our services, provided they agree to keep the information confidential.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking Technologies</h2>
                <p>
                  Our website may use cookies and similar tracking technologies to enhance user experience and analyze website traffic. You can adjust your browser settings to refuse cookies, though this may limit your ability to use certain features of our site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                <p>
                  Depending on your jurisdiction, you may have the right to access, update, or delete your personal information. If you wish to exercise any of these rights, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will take effect immediately upon publication.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
