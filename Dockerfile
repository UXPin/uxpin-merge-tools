FROM uxpin2/node8:8.15.0-1

ARG VAULT_ADDR
ARG VAULT_TOKEN

SHELL ["/bin/bash", "-l", "-c"]

COPY . ./
RUN onvault make dependencies
RUN make build
