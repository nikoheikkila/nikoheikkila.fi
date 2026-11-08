import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

export default {
	parserPreset: "conventional-changelog-conventionalcommits",
	rules: {
		"body-leading-blank": [RuleConfigSeverity.Warning, "always"],
		"body-max-line-length": [RuleConfigSeverity.Error, "always", 100],
		"footer-leading-blank": [RuleConfigSeverity.Warning, "always"],
		"footer-max-line-length": [RuleConfigSeverity.Error, "always", 100],
		"header-max-length": [RuleConfigSeverity.Error, "always", 100],
		"header-trim": [RuleConfigSeverity.Error, "always"],
		"subject-case": [RuleConfigSeverity.Error, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
		"subject-empty": [RuleConfigSeverity.Error, "never"],
		"subject-full-stop": [RuleConfigSeverity.Error, "never", "."],
		"type-case": [RuleConfigSeverity.Error, "always", "lower-case"],
		"type-empty": [RuleConfigSeverity.Error, "never"],
		"type-enum": [
			RuleConfigSeverity.Error,
			"always",
			["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test", "content"],
		],
	},
} satisfies UserConfig;
