CSS = node_modules/@pirxpilot/tip/tip.css \
	build/aurora-tip.css \
	popover.css

all: build/build.js build/build.css build/aurora-tip.css

build:
	@mkdir -p build

build/build.js: index.js | build node_modules
	@browserify \
		--require @pirxpilot/popover \
		--require ./index.js:confirmation-popover \
		--outfile build/build.js

build/build.css: $(CSS) | build
	cat $^ > $@

build/aurora-tip.css: | build
	curl \
		--compressed \
		--output $@ \
		https://raw.githubusercontent.com/component/aurora-tip/master/aurora-tip.css

node_modules: package.json
	npm install

clean:
	rm -fr build node_modules

test: build build/build.css
	@open test/index.html

.PHONY: clean all test
