PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

test-resources: ../../test/resources/repos/nordnet-ui-kit ../../test/resources/repos/polaris ../../test/resources/repos/mineral-ui ../../test/resources/repos/git-repo ../../test/resources/repos/git-repo-rename

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
