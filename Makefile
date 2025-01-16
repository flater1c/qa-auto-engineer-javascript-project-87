install:
	npm ci
gendiff:
	node bin/gendiff.js $(ARGS)
publish:
	npm publish --dry-run
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
tests:
	node --experimental-vm-modules node_modules/jest/bin/jest.js