"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Activity, Loader2, AlertCircle, Shield, Heart, Brain } from "lucide-react"

interface FormData {
  pregnancies: string
  glucose: string
  bloodPressure: string
  skinThickness: string
  insulin: string
  bmi: string
  diabetesPedigreeFunction: string
  age: string
}

export default function PredictPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const response = await fetch("https://predictapi.dmanikanta.site/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Server responded with an error.");
    }

    const data = await response.json(); // Assuming backend returns prediction, confidence, riskLevel

    const predictionData = {
      formData,
      result: {
        prediction: data.prediction,
        confidence: data.confidence,
        riskLevel: data.riskLevel,
        timestamp: new Date().toISOString(),
      },
    };

    localStorage.setItem("latestPrediction", JSON.stringify(predictionData));

    const history = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
    history.unshift(predictionData);
    localStorage.setItem("predictionHistory", JSON.stringify(history.slice(0, 10)));

    router.push("/result");
  } catch (error) {
    console.error("Prediction failed:", error);
    setError("Failed to process prediction. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")
  const completionPercentage = (Object.values(formData).filter((value) => value.trim() !== "").length / 8) * 100

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Brain className="w-12 h-12 text-blue-600" />
                <div className="absolute inset-0 w-12 h-12 bg-blue-600 rounded-full blur-lg opacity-20 animate-pulse" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                AI Health Assessment
              </h1>
            </div>
            <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Provide accurate health information for the most reliable AI-powered diabetes risk prediction. All data is
              encrypted and processed securely.
            </p>

            {/* Progress Indicator */}
            <div className="max-w-md mx-auto mt-8">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Assessment Progress</span>
                <span>{Math.round(completionPercentage)}% Complete</span>
              </div>
              <Progress value={completionPercentage} className="h-3 bg-blue-100" />
            </div>
          </div>


          {/* Form Card */}
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl p-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Activity className="w-7 h-7" />
                Health Assessment Form
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Complete all fields for the most accurate risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              {error && (
                <Alert className="mb-8 border-red-200 bg-red-50">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="pregnancies" className="text-slate-800 font-semibold text-lg">
                      Number of Pregnancies
                    </Label>
                    <Input
                      id="pregnancies"
                      type="number"
                      min="0"
                      max="20"
                      value={formData.pregnancies}
                      onChange={(e) => handleInputChange("pregnancies", e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300"
                      placeholder="e.g., 2"
                      required
                    />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Total number of pregnancies (enter 0 if none)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="glucose" className="text-slate-800 font-semibold text-lg">
                      Glucose Level (mg/dL)
                    </Label>
                    <Input
                      id="glucose"
                      type="number"
                      min="0"
                      max="300"
                      value={formData.glucose}
                      onChange={(e) => handleInputChange("glucose", e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300"
                      placeholder="e.g., 120"
                      required
                    />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Plasma glucose concentration (2-hour oral glucose tolerance test)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="bloodPressure" className="text-slate-800 font-semibold text-lg">
                      Blood Pressure (mmHg)
                    </Label>
                    <Input
                      id="bloodPressure"
                      type="number"
                      min="0"
                      max="200"
                      value={formData.bloodPressure}
                      onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300"
                      placeholder="e.g., 80"
                      required
                    />
                    <p className="text-sm text-slate-500 leading-relaxed">Diastolic blood pressure (bottom number)</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="skinThickness" className="text-slate-800 font-semibold text-lg">
                      Skin Thickness (mm)
                    </Label>
                    <Input
                      id="skinThickness"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.skinThickness}
                      onChange={(e) => handleInputChange("skinThickness", e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300"
                      placeholder="e.g., 25"
                      required
                    />
                    <p className="text-sm text-slate-500 leading-relaxed">Triceps skin fold thickness measurement</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="insulin" className="text-slate-800 font-semibold text-lg">
                      Insulin Level (μU/mL)
                    </Label>
                    <Input
                      id="insulin"
                      type="number"
                      min="0"
                      max="1000"
                      value={formData.insulin}
                      onChange={(e) => handleInputChange("insulin", e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300"
                      placeholder="e.g., 85"
                      required
                    />
                    <p className="text-sm text-slate-500 leading-relaxed">2-hour serum insulin level</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="bmi" className="text-slate-800 font-semibold text-lg">
                      BMI (kg/m²)
                    </Label>
                    <Input
                      id="bmi"
                      type="number"
                      min="10"
                      max="70"
                      step="0.1"
                      value={formData.bmi}
                      onChange={(e) => handleInputChange("bmi", e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300"
                      placeholder="e.g., 25.3"
                      required
                    />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Body mass index (weight in kg ÷ height in m²)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="diabetesPedigreeFunction" className="text-slate-800 font-semibold text-lg">
                      Diabetes Pedigree Function
                    </Label>
                    <Input
                      id="diabetesPedigreeFunction"
                      type="number"
                      min="0"
                      max="3"
                      step="0.001"
                      value={formData.diabetesPedigreeFunction}
                      onChange={(e) => handleInputChange("diabetesPedigreeFunction", e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300"
                      placeholder="e.g., 0.627"
                      required
                    />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Family history of diabetes (genetic influence score)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="age" className="text-slate-800 font-semibold text-lg">
                      Age (years)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="120"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300"
                      placeholder="e.g., 35"
                      required
                    />
                    <p className="text-sm text-slate-500 leading-relaxed">Current age in years</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <Alert className="mb-8 border-blue-200 bg-blue-50">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <AlertDescription className="text-blue-800 font-medium">
                      This assessment is for informational purposes only and should not replace professional medical
                      advice. Please consult with a healthcare provider for proper diagnosis and treatment.
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        Analyzing Your Health Data...
                      </>
                    ) : (
                      <>
                    
                        Predict
                      </>
                    )}
                  </Button>

                  {isLoading && (
                    <div className="mt-6 text-center">
                      <div className="text-sm text-slate-600 mb-2">
                        Processing your data with advanced AI algorithms...
                      </div>
                      <Progress value={33} className="h-2 bg-blue-100" />
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
