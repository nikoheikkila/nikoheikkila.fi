---
title: "Craftsperson's Guide to GitHub Actions #3: Building and Releasing"
author: Niko Heikkilä
lang: en
excerpt: Complete your GitHub Action journey by building production artifacts, implementing semantic versioning, and creating automated release pipelines that verify your action works in real-world conditions before reaching users.
type: post
date: 2026-01-08
hero: null
---

_Originally published on [Polar Squad blog](https://polarsquad.com/blog/craftspersons-guide-to-github-actions-3-building-and-releasing)._

In the previous chapter, we gained confidence through comprehensive testing, including unit tests, property-based tests, and mutation tests. Our action quality is rock-solid.

But quality means nothing until the product reaches users. An action that only exists on your machine is just an expensive science experiment. In this final chapter, we'll build for production and create an automated release pipeline that safely delivers your action to the world.

## Building Your Action

For JavaScript-based GitHub Actions, we need a build process. GitHub doesn't compile or bundle the code before execution, which means we must ship a ready-to-run artefact.

This means transpiling TypeScript to JavaScript, bundling all dependencies, and checking the build artefact into Git. Yes, you read that correctly. Unlike typical projects where you ignore your build artefacts from version control, GitHub Actions requires you to commit them to the repository.

Use whichever bundler you prefer. The [example repository](https://github.com/nikoheikkila/rot-13-action) utilises [Bun](https://bun.sh) for its excellent bundling feature, but esbuild or Rolldown can also be used with similar results.

As discussed in Chapter 1, keep your action entry point separate from source files and tests. This separation makes configuring bundling easier.

The key is defining a reproducible build command that works identically everywhere — on your laptop, on your colleague's machine, in GitHub Actions. I use [Taskfile](https://taskfile.dev) for orchestration, but npm scripts, Makefiles, or shell scripts are equally valid choices. Pick your tool; just make it consistent.

```yaml
build:
  desc: Build GitHub Action
  sources:
    - bin/**/*.ts
    - src/**/*.ts
  generates:
    - dist/index.js
  cmd: >
      bun build bin/index.ts
      --production
      --target node
      --outdir dist
      --format esm
```

This builds our TypeScript entry point into a minified Node.js script in modern ESM format.

Running task build produces a 510 KB bundle containing all dependencies. That might seem large for a simple ROT-13 action, but GitHub Actions runners download it in no time.

The hardest part is to remember to commit the build artefact. Being human — and thus forgetful — we automate this with a pre-commit hook using [Husky](https://typicode.github.io/husky/).

```bash
task -p lint build
git add dist README.md
```

This hook runs linting and building in parallel, then stages both the dist directory and `README.md`.

Why the README? We generate action documentation during the build using action-docs, keeping documentation synchronised with code.

Building and committing is just the first step. Now we need to verify the action actually works and release it safely.

## Trust, But Verify the Action

Our CI/CD pipeline runs the same tests you run locally: unit tests, property-based tests, and mutation tests. But that's not enough.

Despite covering a lot of ground with existing tests, we still need to verify the action works in its actual runtime environment: GitHub Actions. Let's create an acceptance testing workflow. It's verbose, so we'll break it down piece by piece.

```yaml
name: Acceptance Tests
  
on:  
  pull_request:  
    branches: [main]  
  push:  
    branches: [main]

env:  
  original: "Hello, World!"  
  transformed: "Uryyb, Jbeyq!"

jobs:
  test-unit: 
    # Unit, property-based, and mutation tests
    ...

  test-local-action:  
    name: Test local action  
    permissions:  
      contents: read  
    strategy:  
      matrix:  
        runner: [ubuntu-latest, macos-latest, windows-latest]  
    runs-on: ${{ matrix.runner }}  
    
    steps:  
      - name: Checkout  
        uses: actions/checkout@v5  
    
      - name: Test with valid input  
        uses: ./  
        id: valid  
        with:  
          string: ${{ env.original }}  
    
      - name: Fail if output is incorrect  
        if: steps.valid.outputs.result != env.transformed  
        run: |  
          echo "::error::Expected result of transformation was '${{ env.transformed }}', but got '${{ steps.valid.outputs.result }}'"  
          exit 1  
    
      - name: Test with empty input  
        uses: ./  
        id: invalid  
        continue-on-error: true  
        with:  
          string: ""  
    
      - name: Fail if empty input succeeds  
        if: steps.invalid.outcome != 'failure'  
        run: |  
          echo "::error::Expected action to fail when given empty input, but it succeeded."  
          exit 1
```

Why testing matrices? While our action is platform-agnostic, many aren't. File system operations, for instance, often work similarly on Linux and macOS but break on Windows. Developing on a single platform while mocking the entire filesystem effectively hides these issues. Thus, we catch defects before our users do by testing across many platforms.

Since we haven't released the action yet, we use relative notation to reference the repository root. Remember to check out the repository first. GitHub Actions won't do it automatically.

We test both valid input (should succeed) and invalid input (should fail). The assertion steps use conditional execution. They only run when verification fails, resulting in the workflow failing.

## Semantic Versioning Done Right

When the verification passes, it’s time to release. Unlike some release processes that feel like organising a conference, releasing GitHub Actions is refreshingly simple: we tag the verified commit and push.

GitHub Actions recommends semantic versioning with a simple twist. Instead of one, we publish three tags for each release:

* **Full version:** `v1.2.3` (patch-level precision)
* **Minor version:** `v1.2` (minor updates included)
* **Major version:** `v1` (the convenient default)

This approach lets users choose their comfort level. Want automatic updates? Use `v1`. Need stability? Pin to `v1.2.3`. The major version tag is what most users reference, and we keep it updated automatically.

Here's the workflow:

```yaml
jobs:
 test-unit: ...
 test-local-action: ...

 release:
   name: Release
   if: github.event_name == 'push' && github.ref == 'refs/heads/main'
   needs: [test-unit, test-local-action]
   runs-on: ubuntu-latest
   permissions:
     contents: write
   
   steps:
     - name: Checkout
       uses: actions/checkout@v5  
       with:  
         fetch-depth: 0  
   
     - name: Determine next version  
       id: version  
       uses: mathieudutour/github-tag-action@v6.2  
       with:  
         github_token: ${{ secrets.GITHUB_TOKEN }}  
         default_bump: patch  
         create_annotated_tag: true
         dry_run: true
   
     - name: Release new version  
       if: steps.version.outputs.new_version != steps.version.outputs.previous_version  
       run: |  
         function push() {  
           local tag="$1"  
           git tag -fa "$tag" -m "Release $tag"  
           git push origin "$tag" --force    
         }  
           
         git config user.name "$USERNAME"  
         git config user.email "$EMAIL"  
           
         push "$TAG"  
         push "$(echo "$TAG" | cut -d . -f 1)"  
         push "$(echo "$TAG" | cut -d . -f 1-2)"  
           
         gh release create "$TAG" \
           --title "Release $TAG" \
           --notes "$CHANGELOG" \
           --verify-tag  
       env:
         USERNAME: github-actions[bot]  
         EMAIL: github-actions[bot]@users.noreply.github.com  
         GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  
         TAG: ${{ steps.version.outputs.new_tag }}  
         CHANGELOG: ${{ steps.version.outputs.changelog }}
```

We use [mathieudutour/github-tag-action](https://github.com/mathieudutour/github-tag-action) to parse the next version from Conventional Commit messages. It runs in dry-run mode to generate the version without actually pushing it. If your organisation bans external actions, you'll need to implement version logic with a custom action yourself.

The release step creates three tags and force-pushes them. Yes, force-pushing is usually considered extreme, but we're moving tag pointers, not rewriting history. This is safe in the pipeline, but don’t do it on your machine. The consequence of tag mutation is that other developers need to run `git pull --force` to sync updated tags.

We generate a basic changelog from commits. I don't endorse maintaining `CHANGELOG.md` files as they're often out of sync. Instead, create a commit log during release, and edit the release notes afterwards if needed.

## Post-Release Verification: Test Like a User

The release is tagged and pushed. But we're not done yet. We need one final check: verifying the action works exactly as users will use it by referencing the released tag, not local files.

```yaml
jobs:
 test-unit: ...
 test-local-action: ...
 release: ...

 test-tagged-action:
   name: Test tagged action  
   runs-on: ubuntu-latest
   needs: [release]  
   permissions:  
     contents: read  
   
   steps:  
     - name: Test happy case
       uses: nikoheikkila/rot-13-action@v1  
       id: valid  
       with:  
         string: ${{ env.original }}  
   
     - name: Test sad case
       uses: nikoheikkila/rot-13-action@v1  
       id: invalid  
       continue-on-error: true
       with:  
         string: ""  
```

Notice the critical difference from earlier verification: we reference the action using `nikoheikkila/rot-13-action@v1`, not `./`. This tests exactly what users will run.

If this job is successful, you can have high confidence that your release works correctly. It's not just tagged, but also verified.

## Conclusion: Actions Are Software

When this series began, you might have viewed GitHub Actions as simple automation scripts too trivial for serious software engineering practices.

I hope you now see the light: GitHub Actions are software. They deserve the same software engineering rigour as any production system: clean architecture, comprehensive testing, automated verification, and safe delivery pipelines.

The investment pays off in reliability, maintainability, and confidence. Instead of _push-and-pray_ development, you have a fast feedback loop that catches bugs before users do. Instead of fragile scripts that break mysteriously, you have well-tested components that adapt to change.

## What You've Learned

Through this series, you've mastered:

* **Design:** Separating business logic from infrastructure using dependency injection
* **Testing:** Unit tests, property-based tests, and mutation testing for genuine confidence
* **Building:** Creating reproducible production artifacts
* **Releasing:** Semantic versioning with automated verification
* **Delivery:** Safe deployment with post-release verification

## Next Steps

Clone the [example repository](https://github.com/nikoheikkila/rot-13-action) and use it as a foundation for your own actions. The code is production-ready, battle-tested, and follows the principles we've discussed.

Found something to improve? Submit an issue or pull request. All contributions are welcome. After all, continuous improvement is what software craftsmanship is all about.

Now go build something great. Your users will thank you for the reliability, and your future self will thank you for the maintainability.
