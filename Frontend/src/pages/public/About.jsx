import aboutImg from '../../assets/about/about.png';
import bgImg from '../../assets/landing/bg/grass.png'; // ✅ Consistent background

const About = () => {
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

          {/* ✅ LEFT IMAGE */}
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
                src={aboutImg}
                alt="About CRP"
                className="w-[340px] md:w-[380px]"
              />
            </div>

          </div>

          {/* ✅ RIGHT CONTENT */}
          <div>

            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              About Citizen Resolution Platform
            </h1>

            <p className="text-gray-700 mb-4 leading-relaxed">
              The <strong>Citizen Resolution Platform (CRP)</strong> is a
              modern government-oriented web application designed to streamline
              civic complaint management with efficiency, transparency, and accountability.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              The platform empowers citizens to raise complaints related to essential
              public services such as water supply, roads, street lights, sanitation,
              and other municipal concerns. Complaints are digitally tracked, assigned,
              and resolved through a structured workflow.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Staff members actively monitor and update complaint progress,
              while administrators maintain oversight to ensure timely resolutions
              and improved public service delivery.
            </p>

            {/* ✅ FEATURES BOX */}
            <div className="
              bg-white
              border
              rounded-2xl
              p-5
              shadow-sm
              mb-6
            ">
              <ul className="text-gray-700 space-y-2 text-sm">

                <li>✔ Transparent complaint tracking system</li>
                <li>✔ Role-based dashboards (Citizen / Staff / Admin)</li>
                <li>✔ Live status updates with remarks</li>
                <li>✔ Proof & evidence upload support</li>
                <li>✔ Secure authentication & data handling</li>

              </ul>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              This platform aims to enhance civic engagement, improve government
              responsiveness, and deliver a better citizen experience through digital governance.
            </p>

          </div>
        </div>

        {/* ✅ WEBSITE HANDLER / FOOTER STYLE NOTE */}
        <div className="mt-10 pt-6 border-t text-center">

          <p className="text-sm text-gray-600">
            Designed & Developed By
          </p>

          <p className="text-lg font-semibold text-gray-800">
            Nikita Deshmukh
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Citizen Complaints Management System
          </p>

        </div>

      </div>
    </div>
  );
};

export default About;
