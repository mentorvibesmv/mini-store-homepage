// Pure transformer: LaunchInput → StoreConfig. Never mutates input,
// never fabricates content the user did not provide.

import { templates } from "@/data/site";
import type { LaunchInput, StoreConfig, ToStoreConfigResult } from "./types";
import {
  deriveOfferingTitle,
  normalizeBrandColor,
  normalizeEmail,
  normalizeInstagramFromDraft,
  normalizeOptionalText,
  normalizeStyle,
  normalizeWhatsapp,
} from "./normalizers";

export function toStoreConfig(input: LaunchInput): ToStoreConfigResult {
  const tpl = templates.find(
    (t) => t.slug === input.designSlug && t.visible,
  );
  if (!tpl) return { ok: false, reason: "template_not_resolved" };

  const { storeDetails, businessProfile, contentDetails, brandDetails } = input;

  const wa = normalizeWhatsapp(storeDetails.whatsappNumber);
  const brandColor = normalizeBrandColor(brandDetails.brandColor);

  const aboutBody = normalizeOptionalText(contentDetails.aboutBusiness);

  const config: StoreConfig = {
    version: 1,
    template: {
      slug: tpl.slug,
      title: tpl.title,
      category: tpl.category,
    },
    identity: {
      businessName: storeDetails.businessName.trim(),
      tagline: contentDetails.tagline.trim(),
      category: storeDetails.category,
    },
    contact: {
      whatsappE164: wa.e164,
      whatsappHref: wa.href,
      email: normalizeEmail(businessProfile.businessEmail),
      instagramUrl: normalizeInstagramFromDraft(businessProfile.instagramUrl),
      cityOrServiceArea: businessProfile.cityOrServiceArea.trim(),
    },
    hero: {
      headline: contentDetails.tagline.trim(),
      subhead: businessProfile.businessDescription.trim(),
    },
    about: aboutBody === null ? null : { body: aboutBody },
    offering: {
      title: deriveOfferingTitle(storeDetails.category),
      body: contentDetails.productsOrServices.trim(),
    },
    brand: {
      primaryColor: brandColor.color,
      hasCustomColor: brandColor.hasCustomColor,
      style: normalizeStyle(brandDetails.stylePreference),
      logoStatus: brandDetails.logoStatus,
      // specialDesignNotes stays in brand.notes for future renderer logic;
      // it is never rendered as public page copy.
      notes: normalizeOptionalText(brandDetails.specialDesignNotes),
    },
  };

  return { ok: true, value: config };
}
