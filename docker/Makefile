tests:
	docker build \
		--build-arg VAULT_ADDR=$$VAULT_ADDR \
		--build-arg VAULT_TOKEN=$$VAULT_TOKEN \
		-t $$TEST_IMAGE \
		-f Dockerfile \
		..