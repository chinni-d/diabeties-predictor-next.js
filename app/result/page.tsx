"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Heart, Activity, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react"

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable' // Changed import

interface PredictionData {
  formData: {
    pregnancies: string
    glucose: string
    bloodPressure: string
    skinThickness: string
    insulin: string
    bmi: string
    diabetesPedigreeFunction: string
    age: string
  }
  result: {
    prediction: "Diabetic" | "Not Diabetic" | 1 | 0 | "1" | "0" // Updated to include number and string versions of 1 and 0
    confidence: number
    riskLevel: "Low" | "Medium" | "High"
    timestamp: string
  }
}

interface HealthRecommendation {
  category: string
  recommendation: string
  priority: "High" | "Medium" | "Low"
}

export default function ResultPage() {
  const router = useRouter()
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null)
  const [recommendations, setRecommendations] = useState<HealthRecommendation[]>([])
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    // Get prediction data from localStorage
    const storedData = localStorage.getItem("latestPrediction")
    if (storedData) {
      const data = JSON.parse(storedData)
      setPredictionData(data)

      // Generate recommendations based on the result
      const mockRecommendations: HealthRecommendation[] = [
        {
          category: "Diet & Nutrition",
          recommendation:
            data.result.prediction === "Diabetic"
              ? "Follow a strict low-carbohydrate diet with controlled portions. Focus on whole grains, lean proteins, and non-starchy vegetables. Limit sugar and processed foods."
              : "Maintain a balanced diet with controlled carbohydrate intake. Include plenty of fiber-rich foods, lean proteins, and healthy fats.",
          priority: "High",
        },
        {
          category: "Physical Activity",
          recommendation:
            "Engage in at least 150 minutes of moderate-intensity aerobic activity per week, plus 2-3 strength training sessions. Start gradually if you're new to exercise.",
          priority: "High",
        },
        {
          category: "Blood Sugar Monitoring",
          recommendation:
            data.result.prediction === "Diabetic"
              ? "Monitor blood glucose levels daily and maintain a log. Check levels before meals and 2 hours after eating."
              : "Consider periodic blood glucose monitoring, especially if you have risk factors. Annual HbA1c tests are recommended.",
          priority: data.result.prediction === "Diabetic" ? "High" : "Medium",
        },
        {
          category: "Weight Management",
          recommendation:
            Number.parseFloat(data.formData.bmi) > 25
              ? "Work towards achieving and maintaining a healthy BMI (18.5-24.9). Even a 5-10% weight loss can significantly improve health outcomes."
              : "Maintain your current healthy weight through balanced nutrition and regular physical activity.",
          priority: Number.parseFloat(data.formData.bmi) > 25 ? "High" : "Medium",
        },
        {
          category: "Medical Follow-up",
          recommendation:
            data.result.prediction === "Diabetic"
              ? "Schedule an appointment with your healthcare provider immediately for proper diagnosis and treatment planning."
              : "Regular health check-ups every 6-12 months. Discuss your risk factors with your healthcare provider.",
          priority: data.result.prediction === "Diabetic" ? "High" : "Medium",
        },
        {
          category: "Lifestyle Modifications",
          recommendation:
            "Get 7-9 hours of quality sleep nightly, manage stress through relaxation techniques, avoid smoking, and limit alcohol consumption.",
          priority: "Medium",
        },
      ]

      setRecommendations(mockRecommendations)
    } else {
      // Redirect to predict page if no data found
      router.push("/predict")
    }
  }, [router])

  const handleDownloadReport = async () => {
    if (!predictionData) return

    setIsDownloading(true)
    try {
      // Simulate API call to report generation endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const pdf = new jsPDF(); // No need to cast anymore

      // Add title
      pdf.setFontSize(18)
      pdf.text("DIABETES PREDICTION REPORT", 105, 20, { align: "center" })

      // Add generated on date
      pdf.setFontSize(10)
      pdf.text(`Generated on: ${new Date(predictionData.result.timestamp).toLocaleDateString()}`, 105, 30, { align: "center" })

      const patientInfo = [
        ["Age", `${predictionData.formData.age} years`],
        ["BMI", `${predictionData.formData.bmi} kg/m²`],
        ["Number of Pregnancies", predictionData.formData.pregnancies],
      ];

      const healthMetrics = [
        ["Glucose Level", `${predictionData.formData.glucose} mg/dL`],
        ["Blood Pressure", `${predictionData.formData.bloodPressure} mmHg`],
        ["Skin Thickness", `${predictionData.formData.skinThickness} mm`],
        ["Insulin Level", `${predictionData.formData.insulin} μU/mL`],
        ["Diabetes Pedigree Function", predictionData.formData.diabetesPedigreeFunction],
      ];

      // Check if the prediction is 1 (Diabetic) or something else (Not Diabetic)
      const isDiabetic = predictionData.result.prediction === 1 || predictionData.result.prediction === "1"; // Accommodate both number and string '1'

      const predictionResultText = isDiabetic ? "You are Diabetic" : "You are Not Diabetic";
      const predictionColor = isDiabetic ? [255, 0, 0] as [number, number, number] : [0, 128, 0] as [number, number, number]; // Red for Diabetic, Green for Not Diabetic

      const predictionResults = [
        [{ content: "Result", styles: { textColor: [0,0,0] as [number, number, number] } }, { content: predictionResultText, styles: { textColor: predictionColor } }],
        ["Risk Level", predictionData.result.riskLevel],
        ["Confidence", `${(predictionData.result.confidence * 100).toFixed(1)}%`],
      ];

      autoTable(pdf, { // Call autoTable as a function
        startY: 40,
        head: [['PATIENT INFORMATION', '']],
        body: patientInfo,
        headStyles: { fillColor: [22, 160, 133], halign: 'center' },
        columnStyles: { 0: { fontStyle: 'bold' } },
        theme: 'grid',
        tableWidth: 'auto',
        margin: { left: 14, right: 14 },
      });

      autoTable(pdf, { // Call autoTable as a function
        head: [['HEALTH METRICS', '']],
        body: healthMetrics,
        headStyles: { fillColor: [22, 160, 133], halign: 'center' },
        columnStyles: { 0: { fontStyle: 'bold' } },
        theme: 'grid',
        tableWidth: 'auto',
        margin: { left: 14, right: 14 },
      });

      autoTable(pdf, { // Call autoTable as a function
        head: [['PREDICTION RESULTS', '']],
        body: predictionResults,
        headStyles: { fillColor: [22, 160, 133], halign: 'center' },
        columnStyles: { 0: { fontStyle: 'bold' } },
        didParseCell: function (data: any) { // Add type annotation for data
            if (data.section === 'body' && data.column.index === 1 && data.row.index === 0) {
                data.cell.styles.textColor = predictionColor;
            }
        },
        theme: 'grid',
        tableWidth: 'auto',
        margin: { left: 14, right: 14 },
      });

      // Health Recommendations
      let yPos = (pdf as any).lastAutoTable.finalY + 10; // Keep this, autoTable should still add this to the pdf instance
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      pdf.text("HEALTH RECOMMENDATIONS:", 14, yPos)
      yPos += 7
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)

      recommendations.forEach((rec) => {
        if (yPos > 270) { // Check if new page is needed
          pdf.addPage()
          yPos = 20
          pdf.setFontSize(12)
          pdf.setFont("helvetica", "bold")
          pdf.text("HEALTH RECOMMENDATIONS (Continued):", 14, yPos)
          yPos += 7
          pdf.setFont("helvetica", "normal")
          pdf.setFontSize(10)
        }
        pdf.setFont("helvetica", "bold")
        pdf.text(`${rec.category} (${rec.priority} Priority):`, 14, yPos)
        yPos += 5
        pdf.setFont("helvetica", "normal")
        const splitRecommendation = pdf.splitTextToSize(rec.recommendation, 180) // 180 is width of text area
        pdf.text(splitRecommendation, 14, yPos)
        yPos += (splitRecommendation.length * 4) + 5 // Adjust yPos based on number of lines (approx 4pt per line)
      });
      yPos += 5 // Extra space before disclaimer

      // Disclaimer
      if (yPos > 280) { // Check if new page is needed
        pdf.addPage()
        yPos = 20
      }
      pdf.setFontSize(8)
      pdf.setFont("helvetica", "italic")
      const disclaimerText = "This prediction is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment. Generated by DiabetesAI - AI-Powered Health Assessment Tool"
      const splitDisclaimer = pdf.splitTextToSize(disclaimerText, 180)
      pdf.text(splitDisclaimer, 14, yPos)

      pdf.save(`diabetes-prediction-report-${new Date().toISOString().split("T")[0]}.pdf`)

    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!predictionData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-blue-700">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 text-center sm:text-left">
          {typeof window !== "undefined" && localStorage.getItem("fromHistory") === "true" ? (
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("fromHistory")
                router.push("/history")
              }}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to History
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push("/predict")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 w-fit px-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
          )}
          <div>
            <h1 className="text-4xl font-bold text-blue-900">Assessment Results</h1>
            <p className="text-blue-700">
              Generated on {new Date(predictionData.result.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Prediction Result */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                {predictionData.result.prediction === "Diabetic" ? (
                  <AlertCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="text-4xl font-bold text-blue-900">{predictionData.result.prediction}</div>

                <div className="flex items-center justify-center gap-4">
                  <Badge
                    variant={
                      predictionData.result.riskLevel === "High"
                        ? "destructive"
                        : predictionData.result.riskLevel === "Medium"
                          ? "default"
                          : "secondary"
                    }
                    className="text-sm px-4 py-2"
                  >
                    {predictionData.result.riskLevel} Risk
                  </Badge>
                  <div className="text-lg text-blue-700 font-medium">
                    {(predictionData.result.confidence * 100).toFixed(1)}% Confidence
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50 text-left">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    This prediction is for informational purposes only. Please consult with a healthcare professional
                    for proper medical advice and diagnosis.
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleDownloadReport}
                  disabled={isDownloading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Detailed Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Input Summary */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Your Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-900">Age:</span>
                  <span className="ml-2 text-blue-700">{predictionData.formData.age} years</span>
                </div>
                <div>
                  <span className="font-medium text-blue-900">BMI:</span>
                  <span className="ml-2 text-blue-700">{predictionData.formData.bmi} kg/m²</span>
                </div>
                <div>
                  <span className="font-medium text-blue-900">Glucose:</span>
                  <span className="ml-2 text-blue-700">{predictionData.formData.glucose} mg/dL</span>
                </div>
                <div>
                  <span className="font-medium text-blue-900">Blood Pressure:</span>
                  <span className="ml-2 text-blue-700">{predictionData.formData.bloodPressure} mmHg</span>
                </div>
                <div>
                  <span className="font-medium text-blue-900">Insulin:</span>
                  <span className="ml-2 text-blue-700">{predictionData.formData.insulin} μU/mL</span>
                </div>
                <div>
                  <span className="font-medium text-blue-900">Pregnancies:</span>
                  <span className="ml-2 text-blue-700">{predictionData.formData.pregnancies}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-blue-900">Skin Thickness:</span>
                  <span className="ml-2 text-blue-700">{predictionData.formData.skinThickness} mm</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-blue-900">Diabetes Pedigree:</span>
                  <span className="ml-2 text-blue-700">{predictionData.formData.diabetesPedigreeFunction}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Recommendations */}
        <Card className="border-blue-200 shadow-lg mt-8">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Personalized Health Recommendations
            </CardTitle>
            <CardDescription className="text-blue-100">
              Evidence-based recommendations tailored to your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 sm:py-3 max-w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <h4 className="font-semibold text-blue-900">{rec.category}</h4>
                    <Badge variant={rec.priority === "High" ? "destructive" : "secondary"} className="text-xs w-fit px-4">
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-blue-700 text-sm leading-relaxed">{rec.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
