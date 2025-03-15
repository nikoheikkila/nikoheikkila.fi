import Tag from "../tag";
import React, { type FunctionComponent } from "react";

interface FooterProps {
	categories?: readonly string[];
}

const PostFooter: FunctionComponent<FooterProps> = ({ categories }) => (
	<p>
		{(categories || []).map((c: string) => (
			<Tag className="post-footer-tag" key={c} title={c} />
		))}
	</p>
);

export default PostFooter;
