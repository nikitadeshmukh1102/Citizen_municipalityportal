import { Link } from "react-router-dom";
import heroImg from "../../assets/landing/hero/hero-main.png";
import citizenIcon from "../../assets/landing/roles/role-citizen.png";
import staffIcon from "../../assets/landing/roles/role-staff.png";
import adminIcon from "../../assets/landing/roles/role-admin.png";
import grassBg from "../../assets/landing/bg/grass.png";

const Landing = () => {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-gray-900 text-slate-800 dark:text-white">

      {/* ================= HERO SECTION ================= */}
   <section
 className="
  hero-section   
  relative w-full

  min-h-[520px]
  sm:min-h-[560px]
  md:min-h-[680px]

  bg-no-repeat
  bg-cover

  bg-[center_top]
  sm:bg-center
  md:bg-top
"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/75 via-blue-900/75 to-transparent"></div>

    <div className="
  hero-content  
  relative z-10
  max-w-7xl mx-auto

  px-5 md:px-6
  pt-28 sm:pt-32 md:pt-32
  pb-28 md:pb-40

  grid md:grid-cols-2
  gap-8 md:gap-10
  items-center
">
         <div className="animate-fade-in-up">
           <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
  Citizen Resolution Platform
</h1>

        <p className="
  mt-4
  text-[14px] sm:text-base md:text-lg
  leading-relaxed
  text-blue-100
  max-w-xl
">
              A transparent and role-based complaint management system
              where citizens raise issues, staff resolve them,
              and admins monitor everything in real time.
            </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                to="/login"
             className="
               hero-btn 
  px-6 py-3
  text-sm md:text-base

  rounded-xl
 bg-yellow-400 text-black hover:bg-yellow-500
  font-semibold

  shadow-lg
  transition-all duration-300

  hover:scale-[1.03]
  hover:shadow-xl
  active:scale-95
">
                Raise a Complaint
              </Link>

              <Link
                to="/login"
                className="
                  hero-btn 
  px-6 py-3
  text-sm md:text-base

  rounded-xl
  bg-blue-600 text-white
  font-semibold

  shadow-lg
  transition-all duration-300

  hover:scale-[1.03]
  hover:shadow-xl
  active:scale-95
"
              >
                Track Complaint
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white dark:from-gray-900 via-white/80 to-transparent"></div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="-mt-32 relative z-20 max-w-7xl mx-auto px-6">
       <h2 className="text-3xl font-bold text-center mb-10">
  How It Works
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[
            "Citizen registers and logs in",
            "Complaint is submitted with proof",
            "Staff views and assigns department",
            "Status & remarks are updated",
            "Citizen tracks complaint live",
            "Admin monitors entire system"
          ].map((text, i) => (
            <div
           
  key={i}
  className={`
    bg-gradient-to-b
    from-white dark:from-gray-800
    to-blue-50 dark:to-gray-900

    rounded-xl
    p-5 md:p-6

    border border-blue-100 dark:border-gray-700

    shadow-md
    transition-all duration-300

    hover:-translate-y-1
    hover:shadow-lg
    active:scale-[0.98]

    ${i % 2 === 0 ? "rotate-[0.2deg]" : "-rotate-[0.2deg]"}
  `}
>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="font-medium text-slate-700 dark:text-gray-200">
                  {text}
                </span>
              </div>
            </div>
          ))}
        </div>
        

      </section>

      {/* ================= USER ROLES ================= */}
      <section className="mt-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          User Roles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: citizenIcon, title: "Citizen", color: "from-green-400", desc: "Register, raise complaints, upload proof, and track complaint status in real time." },
            { icon: staffIcon, title: "Staff", color: "from-yellow-400", desc: "View complaints, assign departments, update status, and add remarks." },
            { icon: adminIcon, title: "Admin", color: "from-red-400", desc: "Monitor complaints, manage users & staff, and ensure full transparency." }
          ].map((r, i) => (
            <div
              key={i}
              className={`
                rounded-xl
                bg-gradient-to-b ${r.color} to-white dark:to-gray-900
                p-6 text-center
                border border-slate-100 dark:border-gray-700
               shadow-lg hover:shadow-xl
transition-all duration-300
hover:-translate-y-1
active:scale-[0.98]
                
              `}
            >
              <img src={r.icon} className="w-14 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section className="relative mt-24 py-24 overflow-hidden min-h-[520px] md:min-h-0">

        <div
  className="
    absolute inset-0
   bg-no-repeat bg-bottom bg-contain md:bg-cover
    opacity-65
    pointer-events-none
    scale-100
  "
          style={{
            backgroundImage: `url(${grassBg})`,
            maskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.25) 40%, black 75%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.25) 40%, black 75%)"
          }}
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            Key Features
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-6">
            {[
              "Role-based access control",
              "Live complaint tracking",
              "Proof upload support",
              "Staff remarks & status updates",
              "Admin monitoring dashboard"
            ].map((f, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-white dark:from-gray-800 to-blue-50 dark:to-gray-900 rounded-xl p-5 border border-blue-100 dark:border-gray-700 shadow"
              >
                <span className="text-green-600 font-semibold mr-2">✔</span>
                <span className="text-slate-700 dark:text-gray-200 font-medium">
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-blue-900 dark:bg-black text-blue-100 text-center py-6">
        © 2026 Citizen Resolution Platform | All Rights Reserved
      </footer>
    </div>
  );
};

export default Landing;
