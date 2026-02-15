import { useI18n } from "../../i18n";

const OrganizationsMarquee = ({ organizations = [] }) => {
  const { t } = useI18n();
  const baseItems = organizations.length
    ? organizations.filter((org) => org.logo)
    : [
        {
          name: "Construyendo Democracia",
          logo: `${import.meta.env.BASE_URL}logos/construyendo-democracia.png`,
        },
        {
          name: "Ideas para el cambio",
          logo: `${import.meta.env.BASE_URL}logos/ideas-para-el-cambio.png`,
        },
        {
          name: "Mercado Libre",
          logo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/6.6.120/mercadolibre/logo__large_plus.png",
        },
        { name: "Mercado Pago", logo: `${import.meta.env.BASE_URL}logos/mercado-pago.png` },
        {
          name: "Pragma",
          logo: "https://www.pragma.co/hs-fs/hubfs/logo-pragma_blanco%201.png?width=153&height=46&name=logo-pragma_blanco%201.png",
        },
        {
          name: "RITA",
          logo: "https://rita.udistrital.edu.co/iptv2/assets/images/logo_rita.png",
        },
        {
          name: "Universidad de los Llanos",
          logo: "https://www.unillanos.edu.co/images/logo_unillanos.png",
        },
        {
          name: "Universidad Distrital",
          logo: "https://www.udistrital.edu.co/themes/custom/versh/logo.png",
        },
      ];
  const items = [...baseItems].sort((a, b) =>
    a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
  );

  // Duplicate array to create seamless loop
  const loopItems = [...items, ...items];

  return (
    <div className="mt-12 pt-8 border-t border-white/5">
      <div className="flex flex-col gap-3 mb-6">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
          {t("home.organizationsTitle")}
        </h3>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="organization-marquee-track flex w-max items-center gap-10 py-5 px-8">
          {loopItems.map((org, index) => (
            <img
              key={`${org.name}-${index}`}
              src={org.logo}
              alt={org.name}
              className={`h-7 md:h-8 w-auto shrink-0 object-contain opacity-80 grayscale contrast-125 transition-all duration-300 hover:opacity-100 hover:grayscale-0 ${
                org.name === "Universidad Distrital" ? "invert" : ""
              }`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsMarquee;
