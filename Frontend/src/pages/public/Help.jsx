
import helpImg from '../../assets/help/help.png';
import bgImg from '../../assets/landing/bg/grass.png'; // ✅ Existing asset

const Help = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-bottom flex items-center justify-center px-6 py-16"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* ✅ MAIN GLASS CARD */}
      <div className="
        max-w-6xl w-full
        bg-white/80 backdrop-blur-xl
        rounded-3xl
        shadow-[0_25px_70px_rgba(0,0,0,0.18)]
        p-12
      ">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ✅ LEFT CONTENT */}
          <div>

            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Help & Support
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Need assistance with complaints, login, or tracking status?
              Our support team is here to help you.
            </p>

            {/* ✅ CONTACT BOXES */}
            <div className="space-y-4">

              <div className="
                bg-white
                border
                rounded-xl
                px-5 py-4
                shadow-sm
              ">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">📧 Email:</span><br />
                  nikita.support@gov.in
                </p>
              </div>

              <div className="
                bg-white
                border
                rounded-xl
                px-5 py-4
                shadow-sm
              ">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">📞 Helpline:</span><br />
                  +91 9998831319
                </p>
              </div>

              <div className="
                bg-white
                border
                rounded-xl
                px-5 py-4
                shadow-sm
              ">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">🕘 Working Hours:</span><br />
                  9:00 AM – 6:00 PM
                </p>
              </div>

            </div>

            {/* ✅ FOOT NOTE */}
            <p className="mt-8 text-sm text-gray-500 leading-relaxed">
              For urgent civic issues, please contact your local municipal office.
            </p>

          </div>

          {/* ✅ RIGHT IMAGE */}
          <div className="flex justify-center">

            <div className="
              bg-gradient-to-br from-blue-50 to-white
              rounded-2xl
              p-6
              shadow-[0_10px_35px_rgba(0,0,0,0.12)]
              hover:scale-105
              transition
            ">
              <img
                src={helpImg}
                alt="Help Support"
                className="w-[340px] md:w-[380px]"
              />
            </div>

          </div>

        </div>

        {/* ✅ BOTTOM LINE */}
        <div className="mt-10 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            Citizen Complaints Management System • Support Center
          </p>
        </div>

      </div>
    </div>
  );
};

export default Help;