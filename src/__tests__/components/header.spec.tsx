import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import PostHeader from "../../components/post/header";
import formatISO from "date-fns/formatISO";

const defaultProps = {
    title: "",
    excerpt: "",
    author: "",
    datePublished: "",
    timeToRead: 0,
};

test("should display correct post title", async ({ mount }) => {
    const expectedTitle = "This is a title";

    const component = await mount(
        <PostHeader {...defaultProps} title={expectedTitle} />
    );
    const actualTitle = component.locator("h1");

    await expect(actualTitle).toContainText(expectedTitle);
});

test("should display correct post excerpt", async ({ mount }) => {
    const expectedExcerpt = "This is an excerpt of a post";

    const component = await mount(
        <PostHeader {...defaultProps} excerpt={expectedExcerpt} />
    );
    const actualExcerpt = component.locator("data-testid=post-excerpt");

    await expect(actualExcerpt).toContainText(expectedExcerpt);
});

test("should display correct post author", async ({ mount }) => {
    const expectedAuthor = "Niko Heikkilä";

    const component = await mount(
        <PostHeader {...defaultProps} author={expectedAuthor} />
    );
    const actualAuthor = component.locator("data-testid=post-author");

    await expect(actualAuthor).toContainText(expectedAuthor);
});

test("should display correct post publication date", async ({ mount }) => {
    const expectedDate = formatISO(new Date());

    const component = await mount(
        <PostHeader {...defaultProps} datePublished={expectedDate} />
    );
    const actualDate = component.locator("data-testid=post-date");

    await expect(actualDate).toContainText(expectedDate);
});

test("should display correct time to read count", async ({ mount }) => {
    const expectedTimeToRead = "5 minutes";

    const component = await mount(
        <PostHeader {...defaultProps} timeToRead={5} />
    );
    const actualTimeToRead = component.locator("data-testid=post-ttr");

    await expect(actualTimeToRead).toContainText(expectedTimeToRead);
});
