export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Thank you for applying!
        </h1>
        <p className="text-gray-700">
          We’ve received your interest. We’ll be in touch soon!
        </p>
      </div>
    </div>
  );
}
