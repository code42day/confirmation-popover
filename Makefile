
build: index.js template.html node_modules
	@mkdir -p build
	@browserify \
		--require popover \
		--require ./index.js:confirmation-popover \
		--outfile build/build.js

node_modules: package.json
	npm install

clean:
	rm -fr build node_modules

.PHONY: clean build

