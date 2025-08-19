import { useState } from "react";
import SAAdminLayout from "../../../layouts/Sinfodeadmin";

export default function Fee() {
  const [currentStep, setCurrentStep] = useState(1);
  const [branch, setBranch] = useState("");
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [receipt, setReceipt] = useState(null);

  // sample data
  const feeStructures = {
    btech: {
      "Tuition Fee": 50000,
      "Lab Fee": 10000,
      "Library Fee": 5000,
      "Development Fee": 8000,
    },
    mba: {
      "Tuition Fee": 75000,
      "Case Study Fee": 15000,
      "Industry Visit Fee": 10000,
      "Placement Fee": 12000,
    },
    bca: {
      "Tuition Fee": 35000,
      "Computer Lab Fee": 8000,
      "Project Fee": 5000,
      "Exam Fee": 3000,
    },
    mca: {
      "Tuition Fee": 45000,
      "Advanced Lab Fee": 12000,
      "Research Fee": 8000,
      "Thesis Fee": 6000,
    },
  };

  const studentData = {
    john: { name: "John Smith", id: "2024001", email: "john@email.com" },
    sarah: { name: "Sarah Johnson", id: "2024002", email: "sarah@email.com" },
    mike: { name: "Mike Davis", id: "2024003", email: "mike@email.com" },
    emma: { name: "Emma Wilson", id: "2024004", email: "emma@email.com" },
  };

  // Generate Fees
  const handleGenerateFees = () => {
    if (!branch || !course || !student) return;
    setCurrentStep(2);
  };

  // Proceed to Payment
  const handleProceedToPayment = () => {
    setCurrentStep(3);
  };

  // Add Installment
  const handleAddInstallment = () => {
    const studentInfo = studentData[student];
    const receiptData = {
      student: `${studentInfo.name} (${studentInfo.id})`,
      branch,
      course,
      amount: paymentAmount,
      mode: paymentMode,
      date: new Date().toLocaleDateString(),
      nextDue: new Date(nextDueDate).toLocaleDateString(),
      receiptNumber: "RCP" + Date.now().toString().slice(-8),
    };
    setReceipt(receiptData);
    setCurrentStep(4);
  };

  // Reset new payment
  const handleNewPayment = () => {
    setBranch("");
    setCourse("");
    setStudent("");
    setPaymentAmount("");
    setPaymentMode("");
    setNextDueDate("");
    setReceipt(null);
    setCurrentStep(1);
  };

  // Step indicator style
  const getStepClass = (step) => {
    if (step < currentStep)
      return "step-completed w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-green-500";
    if (step === currentStep)
      return "step-active w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-indigo-500";
    return "w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold";
  };

  return (
    <SAAdminLayout>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            EduCRM Fees Management
          </h1>
          <p className="text-gray-600">
            Streamlined fee collection and receipt generation
          </p>
        </div>

        {/* Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center space-x-4">
                <div className={getStepClass(step)}>
                  {step < currentStep ? "✓" : step}
                </div>
                {step < 4 && (
                  <div className="w-16 h-1 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6">Step 1: Select Details</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Branch</option>
                  <option>Main Campus</option>
                  <option>North Branch</option>
                  <option>South Branch</option>
                  <option>East Branch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Course</option>
                  <option value="btech">B.Tech Computer Science</option>
                  <option value="mba">MBA</option>
                  <option value="bca">BCA</option>
                  <option value="mca">MCA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Student</label>
                <select
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Student</option>
                  {Object.entries(studentData).map(([key, s]) => (
                    <option key={key} value={key}>
                      {s.name} - ID: {s.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              disabled={!branch || !course || !student}
              onClick={handleGenerateFees}
              className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Generate Fees Structure
            </button>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6">
              Step 2: Generated Fees Structure
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Student Details</h3>
                <p className="text-gray-600">
                  <strong>{studentData[student].name}</strong> <br />
                  Student ID: {studentData[student].id} <br />
                  Course: {course.toUpperCase()} <br />
                  Branch: {branch} <br />
                  Email: {studentData[student].email}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Fee Breakdown</h3>
                <div className="space-y-2">
                  {Object.entries(feeStructures[course]).map(([type, amt]) => (
                    <div key={type} className="flex justify-between">
                      <span>{type}</span>
                      <span>₹{amt.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-2 font-bold">
                  Total Amount: ₹
                  {Object.values(feeStructures[course]).reduce(
                    (a, b) => a + b,
                    0
                  ).toLocaleString()}
                </div>
              </div>
            </div>
            <button
              onClick={handleProceedToPayment}
              className="mt-6 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6">Step 3: Payment Details</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                type="number"
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="p-3 border rounded-lg"
              />
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="p-3 border rounded-lg"
              >
                <option value="">Select Mode</option>
                <option>Cash</option>
                <option>Card</option>
                <option>UPI</option>
                <option>Net Banking</option>
                <option>Cheque</option>
              </select>
              <input
                type="date"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
                className="p-3 border rounded-lg"
              />
            </div>
            <button
              disabled={!paymentAmount || !paymentMode || !nextDueDate}
              onClick={handleAddInstallment}
              className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Add Installment & Generate Receipt
            </button>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && receipt && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6">Step 4: Payment Receipt</h2>
            <div className="receipt-bg text-white rounded-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">PAYMENT RECEIPT</h3>
                <p className="text-lg opacity-90">EduCRM Institute</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Student Information</h4>
                  <p>{receipt.student}</p>
                  <p>Course: {receipt.course}</p>
                  <p>Branch: {receipt.branch}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Payment Details</h4>
                  <p>Amount Paid: ₹{parseInt(receipt.amount).toLocaleString()}</p>
                  <p>Payment Mode: {receipt.mode}</p>
                  <p>Payment Date: {receipt.date}</p>
                  <p>Next Due Date: {receipt.nextDue}</p>
                </div>
              </div>
              <div className="text-center border-t border-white border-opacity-30 pt-4">
                <p className="font-semibold">Receipt #: {receipt.receiptNumber}</p>
                <p className="text-sm opacity-75 mt-2">
                  Thank you for your payment!
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => window.print()}
                className="bg-gray-700 text-white px-6 py-3 rounded-lg"
              >
                Print Receipt
              </button>
              <button
                onClick={handleNewPayment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg"
              >
                New Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </SAAdminLayout>
  );
}
