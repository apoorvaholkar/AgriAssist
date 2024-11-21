import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank  } from '@fortawesome/free-solid-svg-icons';
import './LoanStatus.css';

const LoanStatus = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [repaymentMonths, setRepaymentMonths] = useState("");


  const banks = [
    { id: 1, name: "Bank A", image: "", interestRate: "7.5%" },
    { id: 2, name: "Bank B", image: "/bank.jpg", interestRate: "8.2%" },
    { id: 3, name: "Bank C", image: "path/to/imageC", interestRate: "6.9%" },
    { id: 4, name: "Bank D", image: "path/to/imageD", interestRate: "7.0%" },
    { id: 5, name: "Bank E", image: "path/to/imageE", interestRate: "8.0%" },
    { id: 6, name: "Bank F", image: "path/to/imageF", interestRate: "7.3%" },
  ];

  const handleApplyClick = (bank) => {
    setSelectedBank(bank.name);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log({ selectedBank, loanAmount, repaymentMonths });
  };

  return (
    <div className="ml-96"> {/* Doubled the margin to ml-32 */}
      <h2 className="text-2xl font-bold mb-6">Loan Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="border rounded-lg shadow-lg p-6 flex flex-col items-center w-80 bg-slate-50 transition-colors duration-300"
          >
            <img src={bank.image} alt={bank.name} className="w-24 h-24 mb-4" />
            <h2 className="text-lg font-semibold mb-2">{bank.name}</h2>
            <p className="text-gray-600 mb-4">Rate of Interest: {bank.interestRate}</p>
            <button
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              onClick={() => handleApplyClick(bank)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Loan Application Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="bank-name" className="block text-sm font-semibold mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bank-name"
                  name="bank-name"
                  value={selectedBank}
                  disabled
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="loan-amount" className="block text-sm font-semibold mb-2">
                  Loan Amount
                </label>
                <input
                  type="number"
                  id="loan-amount"
                  name="loan-amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="repayment-months" className="block text-sm font-semibold mb-2">
                  Repayment Months
                </label>
                <input
                  type="number"
                  id="repayment-months"
                  name="repayment-months"
                  value={repaymentMonths}
                  onChange={(e) => setRepaymentMonths(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md w-full hover:bg-green-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-red-500 ml-4"
                  onClick={() => setShowForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanStatus;
