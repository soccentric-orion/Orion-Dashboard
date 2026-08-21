# Orion-Dashboard Build and Deployment

## 1. Purpose and Scope
Orion-Dashboard is the Next.js web UI in `webui/`. The root Makefile wraps npm development, production build, Vitest, ESLint, and Docker operations. `webui/package.json` also exposes `start` and `type-check`; the root Makefile does not wrap those two scripts.

## 2. Prerequisites
- Node.js/npm compatible with the locked Next.js 16, React 19, TypeScript, ESLint, and Vitest dependencies.
- Docker for image and container targets.
- A browser and access to the Orion API/auth services for end-to-end manual verification.

## 3. Setup
```bash
make install
```
This runs `npm install` in `webui/` and creates the dependency tree from `package-lock.json`. Run `make help` to see the root targets. Do not run npm commands from the repository root; the package manifest is `webui/package.json`.

## 4. Build and Compile
```bash
make dev
make build
cd webui && npm run type-check
```
`make dev` starts Next.js hot reload on its normal development port. `make build` runs `npm run build` and produces `webui/.next`. Type checking is available directly through the package manifest because no root `type-check` target exists.

## 5. Test and Lint
```bash
make test
make lint
cd webui && npm run test:watch
```
`make test` runs `vitest run`; `make lint` runs the package ESLint script. The watch command is intentionally interactive and is not a root Make target. These are UI-level checks and do not prove API/auth/backend integration.

## 6. Packaging and Artifacts
```bash
make docker-build IMAGE=orion-dashboard TAG=latest
```
The root target delegates to `docker/Makefile`, which builds `docker/Dockerfile` with the repository root as context and tags `IMAGE:TAG`. Local production output remains `webui/.next`; the Docker image is the deployable artifact. No registry push target is defined, so publishing requires an external, credentialed `docker push` workflow.

## 7. Deploy, Install, and Run
```bash
make docker-run PORT=3010 IMAGE=orion-dashboard TAG=latest
make docker-logs IMAGE=orion-dashboard
make docker-shell IMAGE=orion-dashboard
make docker-stop IMAGE=orion-dashboard
```
The container publishes host `PORT` to container port 3010, runs detached with `unless-stopped`, and is named after `IMAGE`. Use `make dev` for local development or the Docker path for production-like execution. The Makefile has no cloud deployment or credential injection; configure API endpoints, auth, networking, and TLS in the surrounding deployment environment.

## 8. Cleanup
```bash
make clean
make docker-clean IMAGE=orion-dashboard TAG=latest
```
`clean` removes `.next`. Docker cleanup stops/removes the named container and removes the tagged image. `docker-logs` tails indefinitely, so stop it with the normal terminal interrupt.

## 9. Hardware, Cloud, and Manual Verification Caveats
The dashboard does not access hardware directly. Manually verify browser login/session behavior, API and gRPC-backed views, live updates, error states, and the target deployment's origin/TLS configuration. A running backend and credentials for a real tenant are required for authenticated checks; no such credentials are embedded in this repository.
