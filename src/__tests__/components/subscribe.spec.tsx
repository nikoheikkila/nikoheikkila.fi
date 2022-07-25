import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Subscribe from "../../components/post/subscribe";

test("should display a valid RSS modal", async ({ mount }) => {
    const feedUrl = "https://example.com/rss";
    const config = { siteMetadata: { rss: feedUrl } };

    const component = await mount(<Subscribe config={config} />);
    const link = component.locator("a").first();

    await expect(link).toHaveAttribute("href", feedUrl);
    await expect(component).toContainText("RSS feed");
});

test("should display error for missing RSS URL", async ({ mount }) => {
    const component = await mount(<Subscribe config={{}} />);

    await expect(component).toContainText(
        "No RSS feed configured for this site."
    );
});
