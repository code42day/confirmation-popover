CSS = node_modules/@pirxpilot/tip/tip.css \
	build/aurora-tip.css \
	popover.css

build: index.js | node_modules
	@mkdir -p build
	@browserify \
		--require @pirxpilot/popover \
		--require ./index.js:confirmation-popover \
		--outfile build/build.js

build/build.css: $(CSS) | build
	cat $^ > $@

build/aurora-tip.css: | build
	curl \
		--compress \
		--output $@ \
		https://raw.githubusercontent.com/component/aurora-tip/master/aurora-tip.css

node_modules: package.json
	npm install

clean:
	rm -fr build node_modules

test: build build/build.css
	@open test/index.html

.PHONY: clean build test
