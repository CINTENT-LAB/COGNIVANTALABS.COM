export const GOOGLE_TAG_MANAGER_ID = "GTM-W2SGX7Z8";

const EXCLUDED_PATHS = new Set(["/cognites/login", "/cognites/mycogni"]);

export function shouldLoadGoogleTagManager(pathname: string): boolean {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return !EXCLUDED_PATHS.has(normalizedPath);
}

export const googleTagManagerHeadScript = `(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');`;
