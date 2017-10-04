PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

test-resources: ../../test/resources/repos/nordnet-ui-kit ../../test/resources/repos/arui-feather ../../test/resources/repos/polaris

../../test/resources/repos/nordnet-ui-kit:
	cd ../../test/resources/repos \
	&& git clone https://github.com/nordnet/nordnet-ui-kit.git \
	&& cd nordnet-ui-kit \
	&& git checkout d914edd5f97cadb284f7f47b783106c86fe430d9 \
	&& mkdir ./yarn-cache \
    && yarn install --cache-folder ./yarn-cache

../../test/resources/repos/arui-feather:
	cd ../../test/resources/repos \
	&& git clone https://github.com/alfa-laboratory/arui-feather.git \
	&& cd arui-feather \
	&& git checkout 2299fcb73257d36291eed6d93dc05c2e64531bd2 \
	&& npm install

../../test/resources/repos/polaris:
	cd ../../test/resources/repos \
	&& git clone https://github.com/Shopify/polaris.git \
	&& cd polaris \
	&& git checkout 78d5e5e0e4365ece3b6d8ddfed06027ec72159cd \
	&& mkdir ./yarn-cache \
	&& yarn install --cache-folder ./yarn-cache
