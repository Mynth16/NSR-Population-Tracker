import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Contact</h1>
          <p className="text-gray-600">
            Get in touch with Barangay New San Roque
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div className="p-6 bg-white border-2 border-gray-300 shadow-sm rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-100">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Email</h3>
              <p className="text-gray-600">lgunewsanroque@gmail.com</p>
            </div>
          </div>

          <div className="p-6 bg-white border-2 border-gray-300 shadow-sm rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-100">
                <Phone className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Phone</h3>
              <p className="text-gray-600">(123) 456-7890</p>
            </div>
          </div>

          <div className="p-6 bg-white border-2 border-gray-300 shadow-sm rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-100">
                <MapPin className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Address</h3>
              <p className="text-gray-600">Barangay New San Roque, Pili</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 bg-white border-2 border-gray-300 shadow-sm rounded-2xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Send us a message
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-medium text-white transition-colors rounded-lg md:w-auto bg-emerald-600 hover:bg-emerald-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
