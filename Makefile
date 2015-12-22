DATE = $(shell date)
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
	@bin/install
	
run:
	@bin/run

portrait:
	@echo "firstname_lastname:"
	@read REPLY; \
	mkdir -p portraits/$$REPLY && \
	cp -f index.html portraits/$$REPLY/index.html

release:
	@echo "Commit message:"
	@read REPLY; \
	echo "${DATE} - $$REPLY" >> CHANGELOG && \
	git add --all && \
	git commit -m "$$REPLY" && \
	git push