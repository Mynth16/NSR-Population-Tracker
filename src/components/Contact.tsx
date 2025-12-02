import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "lgunewsanroque@gmail.com",
      gradient: "from-sun-400 to-sun-500",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "XXX-XXX-XXXX",
      gradient: "from-forest-500 to-forest-600",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Barangay New San Roque, Pili",
      gradient: "from-earth-500 to-earth-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-earth-100 to-forest-50">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-sun-200/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-forest-200/20 blur-3xl"></div>
      </div>

      <div className="relative px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-forest-950 font-display">Contact</h1>
              <p className="text-earth-600 font-body">Get in touch with Barangay New San Roque</p>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
          {contactInfo.map((item) => (
            <div 
              key={item.title}
              className="group animate-fade-in-up"
            >
              <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-forest-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden">
                {/* Background glow on hover */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>
                
                <div className={`relative inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-forest-950 font-display">{item.title}</h3>
                <p className="text-earth-600">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="animate-fade-in-up">
          <div className="relative p-8 md:p-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-forest-100 shadow-sm overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-sun-200/30 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-forest-100/30 to-transparent rounded-tr-full"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <Send className="w-6 h-6 text-sun-500" />
                <div>
                  <h2 className="text-2xl font-bold text-forest-950 font-display">Send us a message</h2>
                  <p className="text-sm text-earth-500">We'll get back to you as soon as possible</p>
                </div>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block mb-2 text-sm font-semibold text-forest-800">
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block mb-2 text-sm font-semibold text-forest-800">
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block mb-2 text-sm font-semibold text-forest-800">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block mb-2 text-sm font-semibold text-forest-800">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl resize-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 font-semibold text-white bg-gradient-to-r from-forest-700 to-forest-600 hover:from-forest-600 hover:to-forest-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
