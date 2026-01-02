import { useMemo } from "react";

export interface UtmParams {
  referralUrl: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
}

export const useUtmParams = (): UtmParams => {
  return useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    return {
      referralUrl: document.referrer || window.location.href,
      utmSource: urlParams.get("utm_source"),
      utmMedium: urlParams.get("utm_medium"),
      utmCampaign: urlParams.get("utm_campaign"),
      utmTerm: urlParams.get("utm_term"),
      utmContent: urlParams.get("utm_content"),
    };
  }, []);
};
