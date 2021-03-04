PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

test-resources: ../../test/resources/repos/nordnet-ui-kit ../../test/resources/repos/polaris ../../test/resources/repos/mineral-ui ../../test/resources/repos/git-repo ../../test/resources/repos/git-repo-rename ../../test/resources/repos/storybook-design-system

../../test/resources/repos/nordnet-ui-kit:
	cd ../../test/resources/repos \
	&& git clone https://github.com/nordnet/nordnet-ui-kit.git \
	&& cd nordnet-ui-kit \
	&& git checkout d914edd5f97cadb284f7f47b783106c86fe430d9 \
	&& mkdir ./yarn-cache \
	&& yarn install --cache-folder ./yarn-cache \
	&& rm -rf ./yarn-cache

../../test/resources/repos/polaris:
	cd ../../test/resources/repos \
	&& git clone https://github.com/uxpin-merge/polaris-react.git polaris \
	&& cd polaris \
	&& mkdir ./yarn-cache \
	&& yarn install --cache-folder ./yarn-cache \
	&& rm -rf ./yarn-cache

../../test/resources/repos/mineral-ui:
	cd ../../test/resources/repos \
	&& git clone git@github.com:UXPin/mineral-ui.git \
	&& cd mineral-ui \
	&& git remote add official https://github.com/mineral-ui/mineral-ui.git \
	&& git checkout 6a18faefe3d8339b066c92f1a10b27872f15729b \
	&& mkdir ./npm-cache \
	&& npm install --cache=./npm-cache \
	&& rm -rf ./npm-cache

../../test/resources/repos/git-repo:
	cd ../../test/resources/repos \
	&& mkdir git-repo \
	&& cd git-repo \
	&& touch README.md \
	&& git init \
	&& git add . \
	&& git config user.name test \
	&& git config user.email test@test.dev \
	&& git commit -m "Initial commit"


../../test/resources/repos/git-repo-rename:
	cd ../../test/resources/repos \
	&& mkdir git-repo-rename \
	&& cd git-repo-rename \
	&& touch Component.js \
	&& git init \
	&& git add . \
	&& git config user.name test \
	&& git config user.email test@test.dev \
	&& git commit -m "Initial commit" \
	&& mv Component.js RenamedComponent.js \
	&& git add . \
	&& git commit -m "Renamed Component"

# NOTE for test with Storybook DS.
# The version we test manually lat time is 3da80d0079a522d8e6773edc4e5bb3322ad162b4
# but not checking out for this test resource because the ultimate goal is
# "if you have storybook integreated, it should work". And if this stops working
# We should know and check what has changed.
# By the time we finish storybook integration,
# 1. We should not need to replace Button.js with ButtonWithDefaultExport.js
# 2. We should not need uxpin.config.js
# 3. We should not need to modify babel.config.js
../../test/resources/repos/storybook-design-system:
	cd ../../test/resources/repos \
	&& git clone https://github.com/storybookjs/design-system.git ./storybook-design-system \
	&& cd storybook-design-system \
	&& mkdir ./yarn-cache \
	&& yarn install --cache-folder ./yarn-cache \
	&& yarn add -D link:../../../../../uxpin-merge-storybook-preset-addon --cache-folder ./yarn-cache \
	&& rm -f babel.config.js \
	&& rm -f ./.storybook/main.js \
	&& rm -f ./src/components/Button.js \
	&& cp ../../components/javascript/storybook-design-system/ButtonWithDefaultExport.js ./src/components/Button.js \
	&& cp ../../configs/storybook-design-system-babel.config.js ./babel.config.js \
	&& cp ../../configs/storybook-design-system-main.js ./.storybook/main.js \
	&& cp ../../configs/storybook-design-system-uxpin.config.js ./uxpin.config.js \
	&& rm -rf ./yarn-cache
