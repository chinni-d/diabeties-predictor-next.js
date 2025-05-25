import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Activity,
  Shield,
  BarChart3,
  Users,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  Star,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />

      <div className="relative container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <Heart className="w-16 h-16 text-blue-600 animate-pulse" />
              <Sparkles className="w-6 h-6 text-blue-400 absolute -top-2 -right-2 animate-bounce" />
              <div className="absolute inset-0 w-16 h-16 bg-blue-600 rounded-full blur-lg opacity-20 animate-pulse" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                DiabetesAI
              </h1>
              <div className="text-lg text-blue-600 font-semibold">Health Intelligence Platform</div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 leading-tight">
              Revolutionary AI-Powered Diabetes Risk Assessment
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Harness the power of advanced machine learning to understand your diabetes risk, receive personalized
              health insights, and take proactive steps towards a healthier future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow"
            >
              <Link href="/predict" className="flex items-center">
                <Activity className="w-6 h-6 mr-2" />
                Start Free Assessment
                <span aria-hidden="true" className="ml-2 flex items-center transition-transform duration-200 group-hover:translate-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>95%+ Accuracy</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 group">
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-800 mb-4">AI-Powered Accuracy</CardTitle>
              <CardDescription className="text-base text-slate-600 leading-relaxed">
                Advanced machine learning algorithms trained on comprehensive medical datasets deliver precise risk
                assessments with 95%+ accuracy.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 group">
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-800 mb-4">Personalized Insights</CardTitle>
              <CardDescription className="text-base text-slate-600 leading-relaxed">
                Receive detailed health analytics and evidence-based recommendations tailored specifically to your
                unique health profile.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 group">
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-800 mb-4">Progress Tracking</CardTitle>
              <CardDescription className="text-base text-slate-600 leading-relaxed">
                Monitor your health journey with comprehensive prediction history, trend analysis, and progress
                visualization.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-20 border border-blue-100">
          <h2 className="text-4xl font-bold text-slate-800 text-center mb-4">How DiabetesAI Works</h2>
          <p className="text-base text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Our sophisticated AI system analyzes your health data through a simple, secure, and scientifically-backed
            process.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Input Health Data</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Securely provide your health metrics through our intuitive, HIPAA-compliant form interface.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">AI Analysis</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Our advanced neural networks process your data using cutting-edge machine learning algorithms.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Get Results</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Receive comprehensive risk assessment with confidence scores and detailed explanations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Take Action</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Follow personalized, evidence-based recommendations for optimal health outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Why Choose DiabetesAI?
            </Badge>
            <h2 className="text-3xl font-bold text-slate-800 mb-8 leading-tight">
              Advanced Healthcare Technology at Your Fingertips
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Early Detection & Prevention</h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Identify diabetes risk factors before symptoms appear, enabling proactive health management and
                    prevention strategies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Personalized Health Insights</h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Receive tailored recommendations based on your unique health profile, lifestyle, and risk factors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Instant Results</h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Get immediate risk assessment results with detailed explanations and actionable next steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Privacy & Security</h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Your health data is encrypted, secure, and never shared. Full HIPAA compliance ensures maximum
                    privacy protection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-10 text-white">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Activity className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-base text-blue-100 leading-relaxed mb-8">
                Take the first step towards better health management. Our comprehensive AI assessment takes just 3
                minutes and provides valuable insights into your diabetes risk.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Free comprehensive assessment</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Instant detailed results</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Downloadable health report</span>
              </div>
            </div>

            <Button
              asChild
              className="group w-full mt-8 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 rounded-xl shadow-lg"
            >
              <Link href="/predict" className="flex items-center justify-center">
                <Activity className="w-5 h-5 mr-3" />
                Start Your Free Assessment Now
                <span aria-hidden="true" className="ml-2 flex items-center transition-transform duration-200 group-hover:translate-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}