install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

lint:
	npx eslint

test:
	npx jest

test:
	npx jest --coverage
