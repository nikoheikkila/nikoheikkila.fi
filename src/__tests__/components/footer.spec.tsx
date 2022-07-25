import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import PostFooter from "../../components/post/footer";

test("should not display tags from an empty list", async ({ mount }) => {
    const component = await mount(<PostFooter />);
    const tags = component.locator(".post-footer-tag");

    await expect(tags).toHaveCount(0);
});

test("should display multiple tags from list", async ({ mount }) => {
    const categories = ["development", "design"];

    const component = await mount(<PostFooter categories={categories} />);
    const tags = component.locator(".post-footer-tag");

    await expect(tags).toHaveCount(categories.length);
});
