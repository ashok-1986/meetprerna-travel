import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Privacy Policy | Prerna',
  description: 'Privacy Policy for meetprerna.com, compliant with Indian IT Act and data protection regulations.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <div className="grain" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
      }}></div>

      <header className="fixed top-0 w-full z-40 bg-white/20 backdrop-blur-lg border-b border-white/30 text-[#1A1A18] transition-all duration-500">
        <div className="w-full px-6 md:px-10 h-[64px] flex items-center justify-between uppercase tracking-wider">
          <Link href="/" className="z-50 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded flex items-center h-full pt-[6px]" aria-label="Prerna Home">
            <Image src="/images/Logo.png" alt="Prerna Logo" width={110} height={40} className="w-auto h-[50px] object-contain transition-all duration-500" />
          </Link>
          <div className="flex items-center text-[12px] font-body font-medium">
            <Link href="/" className="opacity-60 hover:opacity-100 hover:scale-[1.03] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded px-1">&larr; Back to Home</Link>
          </div>
        </div>
      </header>

      <main className="pt-[140px] pb-32 md:pb-40 bg-[#FFFCF5] min-h-screen">
        <article className="max-w-[800px] mx-auto px-6 md:px-10 text-[#1A1A18]">
          <h1 className="font-header text-[42px] md:text-[56px] leading-[1.1] mb-8">Privacy Policy</h1>
          <p className="font-body text-[14px] opacity-60 mb-12 uppercase tracking-wider">Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>

          <div className="font-body text-[15px] md:text-[16px] leading-[1.8] opacity-80 space-y-8">
            <p>
              This Privacy Policy describes how we collect, use, and handle your information when you use our website (meetprerna.com) and our services. This policy is drafted in accordance with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 of India.
            </p>

            <section>
              <h2 className="font-header text-[28px] mb-4 text-[#1A1A18] opacity-100">1. Information We Collect</h2>
              <p>
                We believe in minimal data collection. We do not use aggressive tracking cookies or process payments directly on this website. We only collect information that you voluntarily provide to us when you communicate with us via email or WhatsApp to book a tattoo experience or discuss a property collaboration.
              </p>
              <p className="mt-4">This information may include:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Your Name</li>
                <li>Your Contact Information (Phone number, Email address)</li>
                <li>Details related to your booking (Location, dates, tattoo ideas, property details)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-header text-[28px] mb-4 text-[#1A1A18] opacity-100">2. How We Use Your Information</h2>
              <p>
                The information you provide is used strictly for the following purposes:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>To communicate with you regarding your inquiries.</li>
                <li>To schedule and facilitate hand-poked tattoo sessions.</li>
                <li>To coordinate and execute travel-content collaborations for stays and properties.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-header text-[28px] mb-4 text-[#1A1A18] opacity-100">3. Information Sharing and Disclosure</h2>
              <p>
                We deeply respect your privacy. <strong>We do not sell, rent, or trade your personal information to third parties.</strong> We will only disclose your information if required to do so by law or in the good faith belief that such action is necessary to comply with legal obligations under Indian jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="font-header text-[28px] mb-4 text-[#1A1A18] opacity-100">4. Data Security</h2>
              <p>
                We implement reasonable security practices to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Since communications happen via WhatsApp and Email, the security of those transmissions is governed by the respective privacy policies of WhatsApp (Meta) and your email provider.
              </p>
            </section>

            <section>
              <h2 className="font-header text-[28px] mb-4 text-[#1A1A18] opacity-100">5. Your Rights</h2>
              <p>
                You have the right to request access to the personal information we hold about you. You may also request that we correct or delete any inaccurate information, or ask us to remove your information entirely from our records by contacting us.
              </p>
            </section>

            <section>
              <h2 className="font-header text-[28px] mb-4 text-[#1A1A18] opacity-100">6. Contact Us / Grievance Officer</h2>
              <p>
                In accordance with the Information Technology Act, 2000, if you have any questions, concerns, or grievances regarding this Privacy Policy or how your data is handled, please contact us at:
              </p>
              <p className="mt-4 font-medium">
                Email: <a href="mailto:prerna@meetprerna.com" className="text-[#C86B5A] hover:underline">prerna@meetprerna.com</a>
              </p>
            </section>
          </div>
        </article>
      </main>

      <footer className="bg-[#1A1A18] border-t border-white/10 py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center">
            <Image src="/images/Logo.png" alt="Prerna Logo" width={110} height={40} className="w-auto h-[40px] object-contain invert brightness-0" />
          </div>
          <div className="font-body text-[12px] text-white/60">
            © {new Date().getFullYear()} Prerna. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
