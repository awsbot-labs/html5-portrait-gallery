DATE = $(shell date)
ENV_FILE ?= "vars"
.PHONY: run test upload

all: build install

build:
	@bin/build

create:
	@bin/cloudformation create

update:
	@bin/cloudformation update

delete:
	@bin/cloudformation delete

test:
	@bin/test

install:
	@env ENV_FILE=$(ENV_FILE) bin/install

download:
	@bin/download

run:
	@bin/run

portrait:
	@echo "firstname_lastname:"
	@read REPLY; \
	mkdir -p public/portraits/$$REPLY && \
	cp -f public/index.html portraits/$$REPLY/index.html

release:
	@echo "Commit message:"
	@read REPLY; \
	echo "${DATE} - $$REPLY" >> CHANGELOG && \
	git add --all && \
	git commit -m "$$REPLY" && \
	git push