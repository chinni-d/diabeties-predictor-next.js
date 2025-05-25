"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { History, Calendar, Activity, Trash2, Eye, AlertCircle } from "lucide-react"

interface PredictionHistory {
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
    prediction: "Diabetic" | "Not Diabetic" | 1 | 0 | "1" | "0" // Updated type
    confidence: number
    riskLevel: "Low" | "Medium" | "High"
    timestamp: string
  }
}

export default function HistoryPage() {
  const [history, setHistory] = useState<PredictionHistory[]>([])

  useEffect(() => {
    // Load prediction history from localStorage
    const storedHistory = localStorage.getItem("predictionHistory")
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }, [])

  const clearHistory = () => {
    localStorage.removeItem("predictionHistory")
    setHistory([])
  }

  const deleteEntry = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index)
    setHistory(updatedHistory)
    localStorage.setItem("predictionHistory", JSON.stringify(updatedHistory))
  }

  const viewDetails = (entry: PredictionHistory) => {
    // Store the selected entry as the latest prediction for viewing
    localStorage.setItem("latestPrediction", JSON.stringify(entry))
    window.location.href = "/result"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <History className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-blue-900">Prediction History</h1>
          </div>
          <p className="text-blue-700 text-lg">
            Track your diabetes risk assessments over time and monitor your health journey.
          </p>
        </div>

        {history.length === 0 ? (
          <Card className="border-blue-200 shadow-lg">
            <CardContent className="p-12 text-center">
              <History className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No Predictions Yet</h3>
              <p className="text-blue-700 mb-6">
                You haven't made any diabetes risk assessments yet. Start your first assessment to see your results
                here.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <a href="/predict">
                  <Activity className="w-4 h-4 mr-2" />
                  Start Assessment
                </a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-blue-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-2">{history.length}</div>
                  <div className="text-blue-700">Total Assessments</div>
                </CardContent>
              </Card>
              <Card className="border-blue-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {history.filter((h) => h.result.prediction === "Not Diabetic" || h.result.prediction === 0 || h.result.prediction === "0").length}
                  </div>
                  <div className="text-blue-700">Low Risk Results</div>
                </CardContent>
              </Card>
              <Card className="border-blue-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {history.filter((h) => h.result.prediction === "Diabetic" || h.result.prediction === 1 || h.result.prediction === "1").length}
                  </div>
                  <div className="text-blue-700">High Risk Results</div>
                </CardContent>
              </Card>
            </div>

            {/* History List */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-900">Assessment History</h2>
                <Button
                  variant="outline"
                  onClick={clearHistory}
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear History
                </Button>
              </div>

              {history.map((entry, index) => (
                <Card key={index} className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg text-blue-900">Assessment #{history.length - index}</CardTitle>
                          <CardDescription className="text-blue-700">
                            {new Date(entry.result.timestamp).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            entry.result.riskLevel === "High"
                              ? "destructive"
                              : entry.result.riskLevel === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {entry.result.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-blue-900">Result</div>
                        <div className="text-lg font-semibold text-blue-700">{entry.result.prediction}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-blue-900">Confidence</div>
                        <div className="text-lg font-semibold text-blue-700">
                          {(entry.result.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-blue-900">Age</div>
                        <div className="text-lg font-semibold text-blue-700">{entry.formData.age} years</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-blue-900">BMI</div>
                        <div className="text-lg font-semibold text-blue-700">{entry.formData.bmi} kg/m²</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-medium text-blue-900">Glucose:</span>
                        <span className="ml-1 text-blue-700">{entry.formData.glucose} mg/dL</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-900">Blood Pressure:</span>
                        <span className="ml-1 text-blue-700">{entry.formData.bloodPressure} mmHg</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-900">Insulin:</span>
                        <span className="ml-1 text-blue-700">{entry.formData.insulin} μU/mL</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-900">Pregnancies:</span>
                        <span className="ml-1 text-blue-700">{entry.formData.pregnancies}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-blue-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewDetails(entry)}
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteEntry(index)}
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert className="mt-8 border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Your prediction history is stored locally in your browser. Clearing your browser data will remove this
                history. For permanent storage, consider creating an account.
              </AlertDescription>
            </Alert>
          </>
        )}
      </div>
    </div>
  )
}
