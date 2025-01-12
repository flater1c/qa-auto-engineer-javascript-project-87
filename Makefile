install:
	npm ci
gendiff:
	node bin/gendiff.js $(ARGS)
publish:
	npm publish --dry-run
lint:
	npx eslint .