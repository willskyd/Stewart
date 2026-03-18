import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: March 18, 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using Stewart.com, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
              <p className="text-muted-foreground mb-4">
                Stewart.com provides an online platform that connects travelers with accommodation providers, 
                airlines, car rental companies, and other travel service providers. We act as an intermediary 
                and are not the provider of these services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                To use certain features of our platform, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Notifying us of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Booking and Payments</h2>
              <p className="text-muted-foreground mb-4">
                When you make a booking through our platform:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You enter into a contract directly with the service provider</li>
                <li>You agree to pay all charges associated with your booking</li>
                <li>Cancellation policies are set by individual service providers</li>
                <li>Prices are subject to availability and may change</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. User Conduct</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use our platform for any unlawful purpose</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with the operation of our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to access our platform without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Reviews and Content</h2>
              <p className="text-muted-foreground mb-4">
                By submitting reviews or other content, you grant us a non-exclusive, royalty-free license 
                to use, display, and distribute that content. Reviews must be honest and based on genuine experiences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                Stewart.com is not liable for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The quality or safety of accommodations or services</li>
                <li>Actions or omissions of service providers</li>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Events beyond our reasonable control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content on Stewart.com, including logos, text, graphics, and software, is protected 
                by intellectual property laws and belongs to us or our licensors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We may modify these terms at any time. Continued use of our services after changes 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: legal@stewart.com<br />
                Address: 123 Travel Street, Lagos, Nigeria
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
