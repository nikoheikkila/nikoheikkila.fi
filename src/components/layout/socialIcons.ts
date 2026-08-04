import { faBluesky, faGithub, faLinkedin, faSignalMessenger, faTelegram } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/**
 * Brand icons referenced by `siteMetadata.social[].icon`, listed individually
 * rather than via the `fab` pack so the other ~600 icons stay out of the bundle.
 * Adding a social link means adding its icon here — `socialIcons.test.ts` fails
 * otherwise.
 */
export const socialIcons: IconDefinition[] = [faBluesky, faGithub, faLinkedin, faSignalMessenger, faTelegram];
